import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Ensure ConfigModule is imported
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow<string>("DB_HOST", "localhost"),
        port: configService.getOrThrow<number>("DB_PORT", 5432),
        database: configService.getOrThrow<string>("DB_NAME", "yourdatabase"),
        username: configService.getOrThrow<string>("DB_USER", "postgres"),
        password: configService.getOrThrow<string>(
          "DB_PASSWORD",
          "yourpassword",
        ),
        synchronize: configService.getOrThrow<boolean>("DB_SYNC", true), // Set to false in production
        autoLoadEntities: true,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
