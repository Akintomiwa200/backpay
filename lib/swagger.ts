import swaggerJsDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Laskad API Documentation',
      version: '1.0.0',
      description: 'API documentation for Laskad application',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        // process.env.NODE_ENV === "production"
        //   ? "https://your-domain.com"
        //   : "http://localhost:3000/api/v1",
        description:
          process.env.NODE_ENV === 'production'
            ? 'Production server'
            : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./app/api/**/*.ts'], // Path to API routes
};
const swaggerDocs = swaggerJsDoc(options);
export default swaggerDocs;
