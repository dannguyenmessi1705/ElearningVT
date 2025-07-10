import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./questions.entity";
import { Repository } from "typeorm";
import { QuestionRequestDto } from "./questions.request.dto";
import { Course } from "src/courses/courses.entity";
import { CoursesService } from "src/courses/courses.service";
import { QuestionResponseDto } from "./questions.response.dto";
import { randomUUID } from "crypto";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    private readonly courseService: CoursesService
  ) {}

  async findAllByCourseId(courseId: string): Promise<QuestionResponseDto[]> {
    const questions: Question[] = await this.questionRepository.find({
      where: { course: { id: courseId } },
      order: { createdAt: "DESC" },
    });
    return this.convertToResponseDto(questions);
  }

  async findAllByCourseName(
    courseName: string
  ): Promise<QuestionResponseDto[]> {
    const questions: Question[] = await this.questionRepository.find({
      where: { course: { courseName: courseName } },
      order: { createdAt: "DESC" },
    });
    return this.convertToResponseDto(questions);
  }

  async create(
    questions: QuestionRequestDto[],
    courseId: string
  ): Promise<Question[]> {
    const course: Course = await this.courseService.findOne(courseId);
    if (!course) {
      throw new BadRequestException("Course not found");
    }
    const questionRes: Question[] = [];

    for (const q of questions) {
      for (const a of q.answers) {
        const existingQuestion = await this.getQuestionByAnswer(
          q.id,
          parseInt(a, 10)
        );

        if (existingQuestion) {
          console.log("Already exist");
          continue;
        }

        const newQuestion = this.questionRepository.create({
          course,
          questionId: q.id,
          answerId: parseInt(a, 10),
          id: randomUUID().toString(),
          createdAt: new Date(),
        });
        console.log("Creating question:", newQuestion);
        questionRes.push(newQuestion);
      }
    }

    return await this.questionRepository.save(questionRes);
  }

  private convertToResponseDto(questions: Question[]): QuestionResponseDto[] {
    const questtionRes: QuestionResponseDto[] = [];
    questions.forEach((q) => {
      const existingQuestion = questtionRes.find(
        (quest) => quest.id === q.questionId
      );
      if (!existingQuestion) {
        const quest: QuestionResponseDto = {
          id: q.questionId,
          answers: [],
        };
        questtionRes.push(quest);
      }
      questtionRes
        .find((qu) => qu.id === q.questionId)
        .answers.push(q.answerId);
    });
    return questtionRes;
  }

  private async getQuestionByAnswer(
    question: string,
    answer: number
  ): Promise<Question | null> {
    return await this.questionRepository.findOne({
      where: {
        questionId: question,
        answerId: answer,
      },
    });
  }
}
