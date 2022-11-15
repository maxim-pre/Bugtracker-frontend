import http from "./httpService";

export function getProjects() {
  return http.get("http://127.0.0.1:8000/bugtracker/tests/");
}
