import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 3000); // Default to 3000 if PORT is not defined

  app.setGlobalPrefix("api");

  setupSwagger(app);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle("TODO")
    .setDescription("TODO api documentation")
    .setVersion("v1")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);
}

void start();
