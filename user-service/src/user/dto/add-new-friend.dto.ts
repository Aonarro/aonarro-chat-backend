import { IsString, IsNotEmpty } from 'class-validator';

export class AddNewFriendDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
