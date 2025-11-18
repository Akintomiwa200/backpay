import { NextRequest } from 'next/server';
import { WebSocketServer } from 'ws';
import { NextResponse } from 'next/server';
import { getCache, setCache } from '@/lib/redis-utils';

// WebSocket server for real-time updates
const wss = new WebSocketServer({ noServer: true });

// Store connected clients
const clients = new Map();

wss.on('connection', (ws, request) => {
  const url = new URL(request.url!, `http://${request.headers.host}`);
  const userId = url.searchParams.get('userId');
  
  if (userId) {
    clients.set(userId, ws);
    console.log(`Client connected: ${userId}`);
  }

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());
      
      switch (data.type) {
        case 'subscribe_balance':
          // Subscribe to balance updates
          await setCache(`subscription:balance:${userId}`, data.address, 86400);
          break;
          
        case 'subscribe_transactions':
          // Subscribe to transaction updates
          await setCache(`subscription:tx:${userId}`, data.address, 86400);
          break;
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    if (userId) {
      clients.delete(userId);
      console.log(`Client disconnected: ${userId}`);
    }
  });
});

export async function GET(request: NextRequest) {
  // This will be handled by the WebSocket server
  return NextResponse.json({ success: true });
}

// Export the WebSocket server for use in server setup
export { wss };