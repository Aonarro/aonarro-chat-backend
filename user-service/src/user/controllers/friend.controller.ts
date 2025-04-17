import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddNewFriendDto } from '../dto/add-new-friend.dto';
import { SessionAuthGuard } from 'src/utils/guards/session-auth.guard';
import { FriendService } from '../services/friend.service';
import { RequestWithUserId } from 'src/utils/types/types';

@Controller('friends')
export class FriendController {
  private readonly logger = new Logger(FriendController.name);
  constructor(private readonly friendService: FriendService) {}

  @Post('request')
  @UseGuards(SessionAuthGuard)
  async sendRequest(
    @Req() req: RequestWithUserId,
    @Body() receiverUsername: AddNewFriendDto,
  ) {
    const userId = req.userId;

    console.log('FRIEND CONTROLLER', receiverUsername.username);

    return this.friendService.sendFriendRequest(
      userId,
      receiverUsername.username,
    );
  }

  @Post('request/:id/accept')
  @UseGuards(SessionAuthGuard)
  async accept(@Param('id') id: string) {
    return this.friendService.acceptFriendRequest(id);
  }

  @Post('request/:id/decline')
  @UseGuards(SessionAuthGuard)
  async decline(@Param('id') id: string) {
    return this.friendService.declineFriendRequest(id);
  }

  @Get('requests')
  @UseGuards(SessionAuthGuard)
  async requests(@Req() req: RequestWithUserId) {
    const userId = req.userId;
    return this.friendService.getFriendRequests(userId);
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  async friends(@Req() req: RequestWithUserId) {
    const userId = req.userId;
    return this.friendService.getFriends(userId);
  }

  @Get('search')
  async searchUsers(@Query('q') query: string) {
    if (!query) {
      return [];
    }

    const result = await this.friendService.searchUsers(query);

    return result;
  }
}
