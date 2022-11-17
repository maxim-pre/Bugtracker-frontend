import http from "./httpService";
const apiEndpoint = "http://127.0.0.1:8000/auth/users/";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    password: user.password,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
  });
}
