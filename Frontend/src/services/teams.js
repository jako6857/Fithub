import { apiRequest } from "./apiClient";
import { resolveImage } from "../utils/resolveImage";

function withResolvedImage(team) {
  if (!team) return team;
  return {
    ...team,
    image: resolveImage(team.image),
    weekday: team.weekday ?? team.day,
    instructor: team.instructor ?? team.user,
  };
}

export async function getAllTeams() {
  const teams = await apiRequest("/teams");
  return (teams ?? []).map(withResolvedImage);
}

export async function getTeamById(id) {
  const team = await apiRequest(`/teams/${id}`);
  return withResolvedImage(team);
}
