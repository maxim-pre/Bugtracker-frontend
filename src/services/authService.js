import http from "./httpService";

export function login(username, password) {
  return http.post(`/auth/jwt/create/`, {
    username,
    password,
  });
}

export async function getUser(token) {
  const response = http.get(`/auth/users/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
}
