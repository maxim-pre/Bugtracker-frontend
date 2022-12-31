import http from "./httpService";

export function getUsers(token) {
  return http.get("http://127.0.0.1:8000/auth/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateUser(user_id, data, token) {
  return http.put(`http://127.0.0.1:8000/auth/users/${user_id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function deleteUser(user_id, token) {
  return http.delete(`http://127.0.0.1:8000/auth/users/${user_id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
