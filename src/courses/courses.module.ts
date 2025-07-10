import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course } from "./courses.entity";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CoursesService],
  exports: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
