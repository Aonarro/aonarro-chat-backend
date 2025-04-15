import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FriendService {
  private readonly logger = new Logger(FriendService.name);
  constructor() {}
}
