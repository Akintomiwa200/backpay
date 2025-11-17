import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { getCache } from './redis-utils';
import { getWalletBalance } from './blockchain-utils';

// Create WebSocket server instance
export const wss = new WebSocketServer({ noServer: true });

// Store client subscriptions
const clientSubscriptions = new Map<string, Set<string>>();

// Function to start WebSocket server
export function setupWebSocketServer(server: Server) {
  server.on('upgrade', (request, socket, head) => {
    const { pathname, searchParams } = new URL(request.url!, `http://${request.headers.host}`);
    
    if (pathname === '/api/ws') {
      wss.handleUpgrade(request, socket, head, (ws: WebSocket & { userId?: string }) => {
        // Extract user ID from query params
        const userId = searchParams.get('userId');
        if (userId) {
          ws.userId = userId;
          clientSubscriptions.set(userId, new Set());
        }
        
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  // Handle WebSocket connections
  wss.on('connection', (ws: WebSocket & { userId?: string }) => {
    console.log('Client connected:', ws.userId);

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        
        switch (message.type) {
          case 'subscribe_balance':
            if (ws.userId) {
              const subscriptions = clientSubscriptions.get(ws.userId) || new Set();
              subscriptions.add(message.address);
              clientSubscriptions.set(ws.userId, subscriptions);
              
              // Send initial balance
              const balance = await getWalletBalance(message.address);
              ws.send(JSON.stringify({
                type: 'balance_update',
                address: message.address,
                balance,
                timestamp: Date.now()
              }));
            }
            break;
            
          case 'unsubscribe_balance':
            if (ws.userId) {
              const subscriptions = clientSubscriptions.get(ws.userId);
              if (subscriptions) {
                subscriptions.delete(message.address);
              }
            }
            break;
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    ws.on('close', () => {
      if (ws.userId) {
        clientSubscriptions.delete(ws.userId);
      }
      console.log('Client disconnected:', ws.userId);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Periodically push updates to clients
  const updateInterval = setInterval(async () => {
    for (const [userId, addresses] of clientSubscriptions) {
      const client = Array.from(wss.clients).find(
        (ws: WebSocket & { userId?: string }) => ws.userId === userId && ws.readyState === WebSocket.OPEN
      );

      if (client) {
        for (const address of addresses) {
          try {
            const balance = await getWalletBalance(address);
            
            client.send(JSON.stringify({
              type: 'balance_update',
              address,
              balance,
              timestamp: Date.now()
            }));
          } catch (error) {
            console.error('Error pushing update to client:', error);
          }
        }
      }
    }
  }, 10000); // Update every 10 seconds

  // Cleanup on server shutdown
  server.on('close', () => {
    clearInterval(updateInterval);
    wss.close();
  });
}

// Utility functions for managing subscriptions
export function subscribeToBalance(userId: string, address: string) {
  const subscriptions = clientSubscriptions.get(userId) || new Set();
  subscriptions.add(address);
  clientSubscriptions.set(userId, subscriptions);
}

export function unsubscribeFromBalance(userId: string, address: string) {
  const subscriptions = clientSubscriptions.get(userId);
  if (subscriptions) {
    subscriptions.delete(address);
  }
}