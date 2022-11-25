import http from "./httpService";

// returns a list of all the users projects
export function getProjects(token) {
  return http.get("http://127.0.0.1:8000/bugtracker/projects/", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// returns a list of developer objects who are assigned to a given project
export function getProjectDevelopers(project_id, token) {
  return http.get(
    `http://127.0.0.1:8000/bugtracker/projects/${project_id}/developers/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

// creates a new project#
export function createProject(project, token) {
  return http.post(
    "http://127.0.0.1:8000/bugtracker/projects/",
    {
      name: project.name,
      description: project.description,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
