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
      type: "sqljs",
      location:
        this.configService.get<string>("SQLITE_DATABASE") || "database.sqlite",
      autoLoadEntities: true,
      autoSave: true,
      entities: [__dirname + "/../**/*.entity.{js,ts}"],
      synchronize: true,
    };
  }
}
