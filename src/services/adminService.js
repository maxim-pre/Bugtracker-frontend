import http from "./httpService";

export function getUsers(token) {
  return http.get(`/auth/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateUser(user_id, data, token) {
  return http.patch(`/auth/users/${user_id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteUser(user_id, token) {
  return http.delete(`/auth/users/${user_id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
