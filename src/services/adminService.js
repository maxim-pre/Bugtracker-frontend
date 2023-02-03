import http from "./httpService";
import * as data from "../config.json";

const { apiUrl } = data;

export function getUsers(token) {
  return http.get(`${apiUrl}/auth/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateUser(user_id, data, token) {
  return http.patch(`${apiUrl}/auth/users/${user_id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteUser(user_id, token) {
  return http.delete(`${apiUrl}/auth/users/${user_id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
