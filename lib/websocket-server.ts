import { Server } from 'http';
import { wss } from '@/app/api/ws/route';
import { getCache } from './redis-utils';
import { getWalletBalance } from './blockchain-utils';

// Function to start WebSocket server
export function setupWebSocketServer(server: Server) {
  server.on('upgrade', (request, socket, head) => {
    const { pathname } = new URL(request.url!, `http://${request.headers.host}`);
    
    if (pathname === '/api/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  // Periodically push updates to clients
  setInterval(async () => {
    for (const [userId, ws] of wss.clients) {
      try {
        // Get subscribed addresses
        const balanceAddress = await getCache(`subscription:balance:${userId}`);
        
        if (balanceAddress && ws.readyState === ws.OPEN) {
          const balance = await getWalletBalance(balanceAddress);
          
          ws.send(JSON.stringify({
            type: 'balance_update',
            balance,
            address: balanceAddress,
            timestamp: Date.now()
          }));
        }
      } catch (error) {
        console.error('Error pushing update to client:', error);
      }
    }
  }, 10000); // Update every 10 seconds
}