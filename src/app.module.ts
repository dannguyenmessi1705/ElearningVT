import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./config/typeorm.config";
import { QuestionsModule } from './questions/questions.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    QuestionsModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {
    const env = this.configService.get<string>("NODE_ENV");
    console.log(`Application running in ${env} mode`);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
