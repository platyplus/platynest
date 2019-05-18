import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ApplicationModule } from './app.module';
import { useContainer } from 'class-validator';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  useContainer(app.select(ApplicationModule), { fallbackOnErrors: true });

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
