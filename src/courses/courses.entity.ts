import { Question } from "src/questions/questions.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class Course {
  @PrimaryColumn({ name: "course_id" })
  id: string;

  @Column({ name: "course_name", nullable: false })
  courseName: string;

  @Column({ name: "created_at" })
  createdAt: Date;

  @BeforeInsert()
  protected setCreatedAt(): void {
    this.createdAt = new Date();
  }

  @OneToMany(() => Question, (question) => question.course)
  questions: Question[];
}
