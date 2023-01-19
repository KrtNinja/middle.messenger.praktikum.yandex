import { apiConfig } from '../../contants/Api';
import httpClient, { HttpClient } from '../../client/http.client';
import { ProfileDto } from '../../dto/Profile.dto';
import UserDto from '../../dto/User.dto';

const url = apiConfig.USER;

export class UserController {
  constructor(private client: HttpClient) {}

  public changeUserProfile(dto: ProfileDto) {
    return this.client.put(`${url}/profile`, dto);
  }

  public changeUserAvatar(file: FormData | unknown): Promise<UserDto | null> {
    return this.client.put(`${url}/profile/avatar`, file, { headers: {} });
  }

  public changePassword(dto: { oldPassword: string; newPassword: string }) {
    return this.client.put(`${url}/password`, dto);
  }

  public searchUser(login: string): Promise<UserDto[] | null> {
    return this.client.post(`${url}/search`, { login });
  }
}

export default new UserController(httpClient);
