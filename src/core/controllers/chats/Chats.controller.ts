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

  public deleteChat(chatId: string) {
    return this.client.delete(url, { chatId });
  }

  public addUserToChat(chatId: string, userId: number) {
    return this.client.put(`${url}/users`, { users: [userId], chatId });
  }

  public deleteUserFromChat(chatId: string, userId: number) {
    return this.client.delete(`${url}/users`, { users: [userId], chatId });
  }

  public getToken(chatId: string): Promise<{token: string} | null> {
    return this.client.post(`${url}/token/${chatId}`, {});
  }
}

export default new ChatsController(httpClient);
