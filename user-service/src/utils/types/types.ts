import { UpdateProfileDto } from 'src/user/dto/update-profile.dto';

export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface ProfileResponse {
  id: string;
  userId: string;
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

export interface FriendRequestResponse {
  id: string;
  status: string;
  createdAt: Date;
  sender: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
}

export interface ElasticProfileBody {
  id: string;
  username: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}
