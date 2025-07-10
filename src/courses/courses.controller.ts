import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { Course } from "./courses.entity";

@Controller("/courses")
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return await this.courseService.findAll();
  }

  @Get("/:id")
  async getCourseById(@Param("id") id: string): Promise<Course> {
    return await this.courseService.findOne(id);
  }

  @Post()
  async createCourse(
    @Query("name") courseName: string,
    @Query("id") id: string
  ): Promise<Course> {
    if (!courseName) {
      throw new BadRequestException("Course name is required");
    }
    return await this.courseService.create(courseName, id);
  }

  @Patch("/:id")
  async updateCourse(
    @Param("id") id: string,
    @Query("name") courseName: string
  ): Promise<Course> {
    if (!courseName) {
      throw new BadRequestException("Course name is required");
    }
    return await this.courseService.update(id, courseName);
  }

  @Delete("/:id")
  async deleteCourse(@Param("id") id: string): Promise<void> {
    return await this.courseService.remove(id);
  }

  @Get("/search")
  async searchCourses(@Query("name") courseName: string): Promise<Course[]> {
    if (!courseName) {
      throw new BadRequestException("Course name is required");
    }
    return await this.courseService.findByName(courseName);
  }
}
