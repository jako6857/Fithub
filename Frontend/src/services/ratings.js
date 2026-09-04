import { apiRequest } from "./apiClient";

export function getRatingsForTeam(teamId) {
  return apiRequest(`/ratings/${teamId}`);
}

export function createRating({ teamId, numStars }) {
  return apiRequest("/ratings", {
    method: "POST",
    body: { teamId, numStars },
    auth: true,
  });
}

export function deleteRating(ratingId) {
  return apiRequest(`/ratings/${ratingId}`, { method: "DELETE", auth: true });
}

export async function getRatingsSummary(teamId, currentUserId) {
  const ratings = (await getRatingsForTeam(teamId)) ?? [];
  const count = ratings.length;
  const average =
    count > 0 ? ratings.reduce((sum, r) => sum + r.numStars, 0) / count : 0;
  const userRating = currentUserId
    ? ratings.find((r) => r.userId === currentUserId)?.numStars
    : undefined;

  return { average, count, userRating };
}

export async function attachRatingsToTeams(teams, currentUserId) {
  const summaries = await Promise.all(
    teams.map((t) => getRatingsSummary(t.id, currentUserId)),
  );
  return teams.map((t, i) => ({ ...t, ...summaries[i] }));
}
