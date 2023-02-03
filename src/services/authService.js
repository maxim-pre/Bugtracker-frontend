import http from "./httpService";
import * as data from "../config.json";

const { apiUrl } = data;

export function login(username, password) {
  return http.post(`${apiUrl}/auth/jwt/create/`, {
    username,
    password,
  });
}

export async function getUser(token) {
  const response = http.get(`${apiUrl}/auth/users/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
}
