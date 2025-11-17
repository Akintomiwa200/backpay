export default () => ({
  // Application
  app: {
    name: 'BackPay',
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
    url: process.env.APP_URL || 'http://localhost:3000',
    apiPrefix: process.env.API_PREFIX || 'api/v1',
  },

  // Database
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/backpay',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'backpay-jwt-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Web3
  web3: {
    providerUrl: process.env.WEB3_PROVIDER_URL || 'https://mainnet.infura.io/v3/your-key',
    contractAddress: process.env.CONTRACT_ADDRESS,
    privateKey: process.env.PRIVATE_KEY,
  },

  // WhatsApp
  whatsapp: {
    sessionPath: process.env.WHATSAPP_SESSION_PATH || './whatsapp-sessions',
    qrTimeout: parseInt(process.env.WHATSAPP_QR_TIMEOUT ?? '60000', 10) || 60000,
  },

  // Security
  security: {
    throttleLimit: parseInt(process.env.THROTTLE_LIMIT ?? '10', 10) || 10,
    throttleTtl: parseInt(process.env.THROTTLE_TTL ?? '60', 10) || 60,
  },

  // Frontend
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3001',
  },
});