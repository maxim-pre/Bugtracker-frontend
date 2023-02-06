import http from "./httpService";

export function register(user) {
  return http.post(`/auth/users/`, {
    username: user.username,
    password: user.password,
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
  });
}
