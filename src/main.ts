import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

import { fastifyStatic } from "@fastify/static";
import { join } from "path";
import { rootDir } from "./utils/rootDir";

import fastifyHelmet from "@fastify/helmet";
import fastifyCompress from "@fastify/compress";
import { ValidationPipe } from "@nestjs/common";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        file: "public/logs/app.log", // Log to a file in the public directory
      },
      trustProxy: true, // Enable trust proxy for Fastify
      bodyLimit: 10485760, // Set body limit to 10MB
    })
  );

  app.register(fastifyStatic, {
    root: join(rootDir, "public"),
    prefix: "/public",
  });

  app.register(fastifyHelmet);

  app.register(fastifyCompress, {
    encodings: ["gzip", "deflate"],
    global: true, // Apply compression globally
  });

  app.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "X-HTTP-Method-Override",
      "X-Forwarded-For",
      "X-Forwarded-Proto",
      "X-Forwarded-Host",
      "X-Forwarded-Port",
      "X-Forwarded-Server",
      "Origin",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Credentials",
      "Access-Control-Expose-Headers",
      "Access-Control-Max-Age",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Request-Context",
      "Access-Control-Request-Context-Type",
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("NestJS Fastify Elearning")
    .setDescription(
      "API documentation for the NestJS Fastify Elearning application"
    )
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000, "0.0.0.0");
  console.log(`Server is running on ${await app.getUrl()}`);
}

bootstrap();
