import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  // Global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    disableErrorMessages: configService.get('app.env') === 'production',
  }));

  // Global filters
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
  );

  // Global interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new TransformInterceptor(),
    new LoggingInterceptor(),
  );

  // Global guards
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // CORS
  app.enableCors({
    origin: configService.get('frontend.url') || configService.get('FRONTEND_URL'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Swagger Documentation - Only in development
  if (configService.get('app.env') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('BackPay API')
      .setDescription('Web3 Financial Transactions via WhatsApp')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management endpoints')
      .addTag('transactions', 'Transaction management endpoints')
      .addTag('web3', 'Web3 blockchain operations')
      .addTag('whatsapp', 'WhatsApp integration endpoints')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });
  }

  const port = configService.get('app.port') || configService.get('PORT') || 3000;
  await app.listen(port);
  
  console.log(`🚀 BackPay API running on port ${port}`);
  console.log(`🏠 Environment: ${configService.get('app.env')}`);
  
  if (configService.get('app.env') !== 'production') {
    console.log(`📚 API Documentation: http://localhost:${port}/api`);
  }
  
  console.log(`🔗 Frontend URL: ${configService.get('frontend.url')}`);
  console.log(`💾 Database: ${configService.get('database.uri') ? 'Connected' : 'Not configured'}`);
}
bootstrap();