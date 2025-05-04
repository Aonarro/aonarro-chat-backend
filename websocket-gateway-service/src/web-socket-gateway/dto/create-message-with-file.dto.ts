import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsNumber,
} from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;
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
