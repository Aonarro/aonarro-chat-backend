import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { AddNewFriendDto } from '../dto/add-new-friend.dto';
import { SessionAuthGuard } from 'src/utils/guards/session-auth.guard';

@Controller('friends')
export class FriendController {
  private readonly logger = new Logger(FriendController.name);
  constructor() {}

  @Post()
  @UseGuards(SessionAuthGuard)
  addNewFriend(@Body() addNewFriendDto: AddNewFriendDto) {
    t
  }
}
