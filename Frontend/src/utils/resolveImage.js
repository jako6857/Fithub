const modules = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
});

const byFilename = {};
const byNameNoExt = {};

for (const path in modules) {
  const filename = path.split("/").pop();
  const nameNoExt = filename.replace(/\.[^.]+$/, "");
  byFilename[filename] = modules[path].default;
  byNameNoExt[nameNoExt] = modules[path].default;
}

export function resolveImage(value, fallback) {
  if (!value) return fallback;

  const imageValue = typeof value === "object" ? value.url : value;
  if (!imageValue) return fallback;

  const raw = String(imageValue).split("/").pop().split("?")[0];
  if (byFilename[raw]) return byFilename[raw];

  const noExt = raw.replace(/\.[^.]+$/, "");
  if (byNameNoExt[noExt]) return byNameNoExt[noExt];

  return fallback ?? imageValue;
}
