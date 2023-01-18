import UserDto from './User.dto';

class LastMessageDto {
  user: UserDto;
  time: string;
  content: string;
}

class ChatDto {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessageDto;
}

export default ChatDto;
