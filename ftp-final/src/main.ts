import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Receiver } from './azureSB/receiver';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const serv = app.get(Receiver);
  console.log(await serv.receiveMessages(), 'main');
}
bootstrap();
