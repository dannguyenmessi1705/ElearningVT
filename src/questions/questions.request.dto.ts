import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class QuestionRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  answers: string[];
}
