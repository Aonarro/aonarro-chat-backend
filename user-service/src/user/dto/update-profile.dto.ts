import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class UpdateSettingsDto {
  @IsOptional()
  @IsBoolean({ message: 'Two-Factor Enabled must be a boolean value' })
  isTwoFactorEnabled?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Show Last Seen must be a boolean value' })
  showLastSeen?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Profile Visible must be a boolean value' })
  profileVisible?: boolean;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString({ message: 'Username must be a valid string' })
  @MaxLength(50, { message: 'Username cannot exceed 50 characters' })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'First name must be a valid string' })
  @MaxLength(50, { message: 'First name cannot exceed 50 characters' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a valid string' })
  @MaxLength(50, { message: 'Last name cannot exceed 50 characters' })
  lastName?: string;

  @IsOptional()
  @IsString({ message: 'Bio must be a valid string' })
  @MaxLength(500, { message: 'Bio cannot exceed 500 characters' })
  bio?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSettingsDto)
  settings?: UpdateSettingsDto;
}
