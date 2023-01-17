import { apiConfig } from '../../contants/Api';
import httpClient, { HttpClient } from '../../client/http.client';
import { ProfileDto } from '../../dto/Profile.dto';

const url = apiConfig.USER;

export class UserController {
  constructor(private client: HttpClient) {}

  public changeUserProfile(dto: ProfileDto) {
    return this.client.put(`${url}/profile`, dto);
  }

  public changePassword(dto: {oldPassword: string, newPassword: string}) {
    return this.client.put(`${url}/password`, dto);
  }
}

export default new UserController(httpClient);
