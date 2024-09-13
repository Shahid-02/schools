import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  // Apply CORS Security
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Apply Helmet Security
  app.use(helmet());

  // Apply

  await app.listen(3000);
}
bootstrap();
