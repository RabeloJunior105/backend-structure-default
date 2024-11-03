import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorsInterceptor } from './Shared/Handler/Error/AppError.interceptor';
import { ValidationPipe } from './Shared/Handler/Pipes/validation.pipe';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Structure Default')
    .setDescription('The Rabelo structure API default')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/api/swagger.json', (req: any, res: any) => {
    res.send(document)
  })

  app.useGlobalInterceptors(new ErrorsInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
