export function filterClasses(classes, query) {
  const q = query.trim().toLowerCase();
  if (!q) return classes;

  return classes.filter((c) => {
    const haystack = [c.name, c.instructor?.name, c.weekday, c.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
