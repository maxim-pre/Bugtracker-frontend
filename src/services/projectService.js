import http from "./httpService";
import * as data from "../config.json";

const { apiUrl } = data;

// returns a list of all the users projects
export function getProjects(token) {
  return http.get(`${apiUrl}/bugtracker/projects/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getProject(project_id, token) {
  return http.get(`${apiUrl}/bugtracker/projects/${project_id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// returns a list of developer objects who are assigned to a given project
export function getProjectDevelopers(project_id, token) {
  return http.get(`${apiUrl}/bugtracker/projects/${project_id}/developers/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getTickets(token) {
  return http.get(`${apiUrl}/bugtracker/tickets/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// returns a list of ticket objects who are assigned to a given project
export function getProjectTickets(project_id, token) {
  return http.get(`${apiUrl}/bugtracker/projects/${project_id}/tickets/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// creates a new project#
export function createProject(project, token) {
  return http.post(
    `${apiUrl}/bugtracker/projects/`,
    {
      name: project.name,
      description: project.description,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function deleteProject(project_id, token) {
  return http.delete(`${apiUrl}/bugtracker/projects/${project_id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function updateProject(project_id, data, token) {
  return http.put(`${apiUrl}/bugtracker/projects/${project_id}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function addDeveloper(project_id, data, token) {
  return http.post(
    `${apiUrl}/bugtracker/projects/${project_id}/developers/`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function updateProjectDeveloper(project_id, id, data, token) {
  return http.patch(
    `${apiUrl}/bugtracker/projects/${project_id}/developers/${id}/`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function deleteDeveloper(project_id, developer_id, token) {
  return http.delete(
    `${apiUrl}/bugtracker/projects/${project_id}/developers/${developer_id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function createTicket(ticket, project_id, token) {
  return http.post(
    `${apiUrl}/bugtracker/projects/${project_id}/tickets/`,
    {
      title: ticket.title,
      description: ticket.description,
      developers: ticket.developers,
      type: ticket.type,
      priority: ticket.priority,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function deleteTicket(project_id, ticket_id, token) {
  return http.delete(
    `${apiUrl}/bugtracker/projects/${project_id}/tickets/${ticket_id}/`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function updateTicket(project_id, ticket_id, data, token) {
  return http.patch(
    `${apiUrl}/bugtracker/projects/${project_id}/tickets/${ticket_id}/`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function getComments(project_id, ticket_id, token) {
  return http.get(
    `${apiUrl}/bugtracker/projects/${project_id}/tickets/${ticket_id}/comments/`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function DeleteComment(project_id, ticket_id, comment_id, token) {
  return http.delete(
    `${apiUrl}/bugtracker/projects/${project_id}/tickets/${ticket_id}/comments/${comment_id}/`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function CreateComment(project_id, ticket_id, data, token) {
  return http.post(
    `${apiUrl}/bugtracker/projects/${project_id}/tickets/${ticket_id}/comments/`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
