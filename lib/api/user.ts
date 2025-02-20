import { Http } from "./http";
import { IUser, IRegister, ILogin } from "@/types/user";

export default class UserApi {
  static async register(user: IUser) {
    const response = await Http.post<{ user: IUser; token: string }, IRegister>(
      "/user/register",
      user
    );

    return response?.data;
  }

  static async login({ email, password }: ILogin) {
    const response = await Http.post<{ user: IUser; token: string }, ILogin>(
      "/user/login",
      {
        email,
        password,
      }
    );

    return response.data;
  }

  static async verify(token?: string) {
    const response = await Http.post<IUser, null>("/user/verify", null, {
      withCredentials: true,
      headers: token ? { Cookie: `token=${token}` } : undefined,
    });
    return response?.data;
  }
  static async logout() {
    const response = await Http.post<IUser, null>("/user/logout", null);

    return response?.data;
  }
}
