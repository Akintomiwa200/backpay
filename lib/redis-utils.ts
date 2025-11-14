import { getRedisClient } from './redis';

export async function setCache(
  key: string,
  value: unknown,
  expireInSeconds: number = 3600
) {
  try {
    const client = await getRedisClient();
    const serializedValue = JSON.stringify(value);
    await client.setEx(key, expireInSeconds, serializedValue);
    return true;
  } catch {
    return false;
  }
}

export async function getCache(key: string) {
  try {
    const client = await getRedisClient();
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export async function deleteCache(key: string) {
  try {
    const client = await getRedisClient();
    await client.del(key);
    return true;
  } catch {
    return false;
  }
}
