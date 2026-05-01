import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exit } from 'process';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });

  const allowedCors: string[] = process.env.ALLOWED_CORS
    ? process.env.ALLOWED_CORS.split(',').map((origin) => origin.trim())
    : [];
  if (!allowedCors || allowedCors.length === 0) {
    console.warn(
      'ALLOWED_CORS environment variable is not set. CORS will be enabled for all origins.',
    );
    exit(1);
  }
  app.enableCors({
    origin: allowedCors.length > 0 ? allowedCors : '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // setting up swagger ui documentation
  const config = new DocumentBuilder()
    .setTitle('Kodashub API')
    .setDescription(
      `This application provides an interface for Kodashub to manage its resources.`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:${process.env.PORT || 4001}`, 'Local')
    .addServer('https://api-kodashub.vercel.app', 'Staging')
    .addServer('https://api.kodashub.com.ng', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      // defaultModelsExpandDepth: -1,
      persistAuthorization: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
