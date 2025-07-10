import { Course } from "src/courses/courses.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @ManyToOne(() => Course, (course) => course.questions, { eager: true })
  @JoinColumn({ name: "course_id", referencedColumnName: "id" })
  course: Course;

  @Column({ name: "question_id" })
  questionId: string;

  @Column({ name: "answer_id" })
  answerId: number;

  @Column({ name: "created_at" })
  createdAt: Date;

  @BeforeInsert()
  protected setCreatedAt(): void {
    this.createdAt = new Date();
  }
}
