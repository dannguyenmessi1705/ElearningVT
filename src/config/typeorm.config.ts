import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(
    connectionName?: string
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.configService.get<string>("PG_HOST"),
      port: this.configService.get<number>("PG_PORT"),
      username: this.configService.get<string>("PG_USER"),
      password: this.configService.get<string>("PG_PASSWORD"),
      database: this.configService.get<string>("PG_DB"),
      autoLoadEntities: true,
      entities: [__dirname + "/../**/*.entity.{js,ts}"],
      synchronize: false,
    };
  }
}
