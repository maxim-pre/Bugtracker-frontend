import http from "./httpService";
import axios from "axios";
const apiEndpoint = "http://127.0.0.1:8000/auth/jwt/create/";

export function login(username, password) {
  return http.post(apiEndpoint, { username, password });
}

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export async function getUser() {
  const response = http.get("http://127.0.0.1:8000/auth/users/me/");
  return response;
}
