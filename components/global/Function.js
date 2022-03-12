export function slugNameGenerator(string) {
  return string
    .replace(/[^a-z0-9\s]/gi, "")
    .replace(/[_\s]/g, "-")
    .toLowerCase()
}

export function getUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
