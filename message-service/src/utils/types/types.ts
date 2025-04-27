export interface CreateMessageDto {
  chatId: string;
  content: string;
  senderId: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
}

export interface MessageWithSender {
  id: string;
  content: string;
  createdAt: Date;
  edited: boolean;
  readBy: string[];
  deletedForEveryone: boolean;
  sender: Omit<UserProfile, 'id'>;
}

export interface MessagesResponse {
  messages: MessageWithSender[];
  total: number;
  hasMore: boolean;
}
