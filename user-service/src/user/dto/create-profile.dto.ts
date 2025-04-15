import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateProfileDto {
  @IsString({ message: 'Username must be a valid string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(30, { message: 'Username cannot exceed 30 characters' })
  username: string;

  @IsString({ message: 'User ID must be a valid string' })
  userId: string;

  @IsString({ message: 'Email must be a text value' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
