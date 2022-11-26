import http from "./httpService";

export function login(username, password) {
  return http.post("http://127.0.0.1:8000/auth/jwt/create/", {
    username,
    password,
  });
}

export async function getUser(token) {
  const response = http.get("http://127.0.0.1:8000/auth/users/me/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
}
