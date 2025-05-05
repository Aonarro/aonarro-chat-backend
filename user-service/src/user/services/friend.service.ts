import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { FriendRequestResponse } from 'src/utils/types/types';
import { ElasticSearchService } from './elastic-search.service';

@Injectable()
export class FriendService {
  private readonly logger = new Logger(FriendService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly elasticSearchService: ElasticSearchService,
  ) {}

  async sendFriendRequest(userId: string, receiverUsername: string) {
    const sender = await this.prismaService.profile.findFirst({
      where: { userId },
    });

    if (!sender) {
      this.logger.warn(`Sender profile not found for userId: ${userId}`);
      throw new NotFoundException('Your profile not found');
    }

    const receiver = await this.prismaService.profile.findFirst({
      where: { username: receiverUsername },
    });

    if (!receiver) {
      this.logger.warn(
        `Receiver profile not found for username: ${receiverUsername}`,
      );
      throw new NotFoundException('Receiver profile not found');
    }

    if (sender.id === receiver.id) {
      throw new ForbiddenException("Can't send friend request to yourself");
    }

    const existingRequest = await this.prismaService.friendRequest.findFirst({
      where: {
        senderId: sender.id,
        receiverId: receiver.id,
      },
    });

    if (existingRequest) {
      throw new ForbiddenException('Friend request already sent');
    }

    const existingFriendship = await this.prismaService.friendship.findFirst({
      where: {
        OR: [
          { user1Id: sender.id, user2Id: receiver.id },
          { user1Id: receiver.id, user2Id: sender.id },
        ],
      },
    });

    if (existingFriendship) {
      throw new ForbiddenException('You are already friends with this user');
    }

    await this.prismaService.friendRequest.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
      },
    });

    return {
      success: true,
      message: 'Friend request sent successfully',
    };
  }

  async acceptFriendRequest(requestId: string) {
    const request = await this.prismaService.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    if (request.status !== 'PENDING') {
      throw new ForbiddenException(
        `Request already ${request.status.toLowerCase()}`,
      );
    }

    await this.prismaService.$transaction(async (prisma) => {
      await prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: 'ACCEPTED' },
      });

      const [user1Id, user2Id] = [request.senderId, request.receiverId];

      await prisma.friendship.create({
        data: {
          user1Id,
          user2Id,
        },
      });
    });

    return {
      success: true,
      message: 'Friend added! You can now chat together.',
    };
  }

  async declineFriendRequest(requestId: string) {
    const request = await this.prismaService.friendRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new NotFoundException('Friend request not found');
    }

    if (request.status !== 'PENDING') {
      throw new ForbiddenException(
        `Cannot decline request that is already ${request.status.toLowerCase()}`,
      );
    }

    await this.prismaService.friendRequest.update({
      where: { id: requestId },
      data: { status: 'DECLINED' },
    });

    return {
      success: true,
      message: 'Friend request declined successfully',
    };
  }

  async getFriendRequests(userId: string): Promise<{
    success: true;
    data: FriendRequestResponse[];
  }> {
    const profile = await this.prismaService.profile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const requests = await this.prismaService.friendRequest.findMany({
      where: {
        receiverId: profile.id,
        status: 'PENDING',
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            lastLoginAt: true,
          },
        },
      },
      omit: {
        receiverId: true,
        senderId: true,
      },
    });

    return {
      success: true,
      data: requests,
    };
  }

  async getFriends(userId: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: { userId: userId },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const friendships = await this.prismaService.friendship.findMany({
      where: {
        OR: [{ user1Id: profile.id }, { user2Id: profile.id }],
      },
      include: {
        user1: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            lastLoginAt: true,
          },
        },
        user2: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
            lastLoginAt: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    const friends = friendships.map((friendship) =>
      friendship.user1Id === profile.id ? friendship.user2 : friendship.user1,
    );

    return {
      success: true,
      data: friends,
    };
  }

  async searchUsers(query: string, userId: string) {
    const users = await this.elasticSearchService.searchProfiles(query, userId);

    return users;
  }
}
