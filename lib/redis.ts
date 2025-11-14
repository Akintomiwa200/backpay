import { createClient, RedisClientType } from 'redis';

let client: RedisClientType;
let isConnected = false;

async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({
      url: process.env.NEXT_REDIS_URL || 'redis://localhost:6379',
    });

    client.on('error', () => {
      isConnected = false;
    });

    client.on('connect', () => {
      isConnected = true;
    });

    client.on('end', () => {
      isConnected = false;
    });
  }

  if (!isConnected) {
    try {
      await client.connect();
    } catch {
      throw new Error('Redis connection failed');
    }
  }

  return client;
}

export { getRedisClient };
export type { RedisClientType };
