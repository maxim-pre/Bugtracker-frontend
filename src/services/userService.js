import http from "./httpService";
import * as data from "../config.json";

const { apiUrl } = data;

export function register(user) {
  return http.post(`${apiUrl}/auth/users/`, {
    username: user.username,
    password: user.password,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
  });
}
