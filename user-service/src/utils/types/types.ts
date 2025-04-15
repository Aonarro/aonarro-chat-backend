import { UpdateProfileDto } from 'src/user/dto/update-profile.dto';

export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface ProfileResponse {
  id: string;
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  lastLoginAt?: Date | null;
  createdAt: Date;
  settings: {
    isTwoFactorEnabled: boolean;
    showLastSeen: boolean;
    profileVisible: boolean;
  };
}

export type UpdateProfilePayload = UpdateProfileDto & {
  avatar?: Express.Multer.File;
};
