import { apiRequest } from "./apiClient";
import { getTeamById } from "./teams";

export function getBookings() {
  return apiRequest("/bookings", { auth: true });
}

export function createBooking(teamId) {
  return apiRequest("/bookings", {
    method: "POST",
    body: { teamId },
    auth: true,
  });
}

export function deleteBooking(bookingId) {
  return apiRequest(`/bookings/${bookingId}`, { method: "DELETE", auth: true });
}

export async function getMySchedule() {
  const bookings = await getBookings();
  const list = bookings ?? [];

  const teams = await Promise.all(
    list.map((booking) => getTeamById(booking.teamId ?? booking.team?.id)),
  );

  return list.map((b, index) => ({
    bookingId: b.id,
    team: {
      ...teams[index],
      weekday: teams[index]?.weekday ?? teams[index]?.day,
    },
  }));
}
