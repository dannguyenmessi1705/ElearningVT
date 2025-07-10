import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Course } from "./courses.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: string): Promise<Course> {
    return this.courseRepository.findOneBy({ id });
  }

  async create(courseName: string, id: string): Promise<Course> {
    const course: Course[] | null = await this.courseRepository.find({
      where: { id },
    });
    if (course.length > 0) {
      throw new Error("Course already exists");
    }
    const newCourse = this.courseRepository.create({ courseName, id });
    return this.courseRepository.save(newCourse);
  }

  async update(id: string, courseName: string): Promise<Course> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new Error("Course not found");
    }
    course.courseName = courseName;
    return this.courseRepository.save(course);
  }

  async remove(id: string): Promise<void> {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) {
      throw new Error("Course not found");
    }
    await this.courseRepository.remove(course);
  }

  async findByName(courseName: string): Promise<Course[] | null> {
    return this.courseRepository.find({ where: { courseName } });
  }
}
