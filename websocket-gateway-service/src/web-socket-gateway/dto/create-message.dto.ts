import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  content: string;

  @IsUUID()
  @IsNotEmpty()
  chatId?: string | null;
}
