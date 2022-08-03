import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigService } from './config/swagger/swagger.service';

// creatTokenGooglePgoto()

require('dotenv').config();
const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = app.get<SwaggerConfigService>(SwaggerConfigService);
  logger.log(`Swagger Is Enable On Prefix /api`, 'Swagger');
  swaggerConfig.init(app);
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    logger.log(`sever is running on port:${port}`);
  });
}
bootstrap();
