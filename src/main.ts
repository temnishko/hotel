import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
      .setTitle('Тестовое задание бронирование  номеров')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addBearerAuth({ in: 'header', type: 'apiKey', name: 'Authorization' })
      .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}
bootstrap();
