import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { IsPasswordMatchConstraint } from '../../utils/decorators/isPasswordMatch.decorator';

export class RegisterDto {
  @IsString({ message: 'Email must be a text value' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'Password must be a text value' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString({ message: 'Password confirmation must be a text value' })
  @IsNotEmpty({ message: 'Please confirm your password' })
  @MinLength(6, {
    message: 'Password confirmation must be at least 6 characters long',
  })
  @Validate(IsPasswordMatchConstraint, { message: 'Passwords do not match' })
  passwordRepeat: string;
}
