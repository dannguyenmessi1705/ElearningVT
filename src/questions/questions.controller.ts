import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionRequestDto } from "./questions.request.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getQuesttiondByCourseName(@Query("name") courseName: string) {
    if (!courseName) {
      throw new BadRequestException("Course name is required");
    }
    return await this.questionsService.findAllByCourseName(courseName);
  }

  @Get("/:id")
  async getQuestionsByCourseId(@Param("id") courseId: string) {
    return await this.questionsService.findAllByCourseId(courseId);
  }

  @Post("/:id")
  async createQuestion(
    @Param("id") courseId: string,
    @Body() createQuestionDto: QuestionRequestDto[]
  ) {
    if (!createQuestionDto || createQuestionDto.length === 0) {
      throw new BadRequestException("At least one question is required");
    }
    if (!courseId) {
      throw new BadRequestException("Course ID is required");
    }
    return await this.questionsService.create(createQuestionDto, courseId);
  }
}
