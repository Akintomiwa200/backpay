export const JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET || 'backpay-secret-key',
  expiresIn: '7d',
};

export const THROTTLER_CONSTANTS = {
  ttl: 60,
  limit: 10,
};

export const WEB3_CONSTANTS = {
  defaultGasLimit: 100000,
  defaultGasPrice: '20000000000',
};

export const WHATSAPP_CONSTANTS = {
  sessionPath: './whatsapp-sessions',
  qrTimeout: 60000,
};