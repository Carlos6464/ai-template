import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Prefixo global (ex: localhost:3000/api/auth/login)
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // 2. Habilitar validação de DTOs (importante para SOLID)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 3. Habilitar CORS para o seu Angular com PrimeNG
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Gateway rodando em: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
