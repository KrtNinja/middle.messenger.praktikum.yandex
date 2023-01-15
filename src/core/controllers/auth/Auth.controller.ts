import SignInDto from '../../dto/SignIn.dto';
import SignUpDto from '../../dto/SignUp.dto';
import UserDto from '../../dto/User.dto';
import { apiConfig } from '../../contants/Api';
import httpClient, { HttpClient } from '../../client/http.client';

const { AUTH } = apiConfig;

class AuthController {
  constructor(private client: HttpClient) {}

  public signIn(data: SignInDto) {
    return this.client.post(`${AUTH}/signin`, data);
  }

  public signUp(data: SignUpDto) {
    return this.client.post(`${AUTH}/signup`, data);
  }

  public getUserInfo(): Promise<UserDto | null> {
    return this.client.get(`${AUTH}/user`);
  }

  public logout() {
    return this.client.post(`${AUTH}/logout`, {});
  }
}

export default new AuthController(httpClient);
