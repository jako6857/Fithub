import { apiRequest } from "./apiClient";

export function login({ username, password }) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: { username, password },
  });
}

export function verify() {
  return apiRequest("/auth/verify", { auth: true });
}
