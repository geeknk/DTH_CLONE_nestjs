import { NestFactory } from '@nestjs/.core-xpvcP1DX';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
    // Configure global settings
    app.setGlobalPrefix('api');
    app.enableCors();
    
  await app.listen(3000);
}
bootstrap();
