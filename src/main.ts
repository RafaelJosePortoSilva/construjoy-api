import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor} from '@nestjs/common';
import { ValidationExceptionFilter } from './shared/filters/class-validator-exception.filter';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura o CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // Frontend URL
    credentials: true, // se precisar enviar cookies ou headers de auth
  })
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
