import { apiRequest } from "./apiClient";

export function getUsers(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/users${query ? `?${query}` : ""}`);
}

export function getUserById(id) {
  return apiRequest(`/users/${id}`);
}

export function createUser({ name, email, password }) {
  return apiRequest("/users", {
    method: "POST",
    body: { name, email, password },
  });
}

export function updateUser(id, payload) {
  return apiRequest(`/users/${id}`, {
    method: "PUT",
    body: payload,
    auth: true,
  });
}

export function deleteUser(id) {
  return apiRequest(`/users/${id}`, { method: "DELETE", auth: true });
}
