import { IsString, IsNotEmpty, IsOptional, IsObject } from 'class-validator';

class FileDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsNotEmpty()
  data: number[];
}

export class SendMessageWithFileDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  @IsObject()
  file: FileDto;
}
