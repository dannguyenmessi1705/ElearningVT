import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./questions.entity";
import { QuestionsService } from "./questions.service";
import { QuestionsController } from "./questions.controller";
import { CoursesModule } from "src/courses/courses.module";

@Module({
  imports: [TypeOrmModule.forFeature([Question]), CoursesModule],
  providers: [QuestionsService],
  exports: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
