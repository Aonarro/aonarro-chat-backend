import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'Username must be a valid string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(30, { message: 'Username cannot exceed 30 characters' })
  username: string;

  @IsString({ message: 'User ID must be a valid string' })
  userId: string;
}
