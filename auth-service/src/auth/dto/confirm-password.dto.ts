import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ConfirmPasswordDto {
  @IsString({ message: 'Password must be a text value' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
