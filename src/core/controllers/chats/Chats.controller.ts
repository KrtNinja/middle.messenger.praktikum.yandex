import httpClient, { HttpClient } from '../../client/http.client';
import { apiConfig } from '../../contants/Api';
import ChatDto from '../../dto/Chat.dto';

const url = apiConfig.CHATS;

export class ChatsController {
  constructor(private client: HttpClient) {}

  public getChats(): Promise<ChatDto[] | null> {
    return this.client.get(url);
  }

  public createChat(title: string) {
    return this.client.post(url, { title });
  }
}

export default new ChatsController(httpClient);
