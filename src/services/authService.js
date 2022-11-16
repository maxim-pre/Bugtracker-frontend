import http from "./httpService";

const apiEndpoint = "http://127.0.0.1:8000/auth/jwt/create/";

export function login(username, password) {
  return http.post(apiEndpoint, { username, password });
}
