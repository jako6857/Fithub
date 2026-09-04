import { resolveImage } from "./resolveImage";

export function getUserDisplayName(user) {
  if (!user) return "";
  if (user.name) return user.name;
  return [user.firstname, user.lastname].filter(Boolean).join(" ");
}

export function getUserAvatar(user) {
  if (!user) return "";
  return resolveImage(user.image);
}
