// Converts a display name like "Novated Lease" into a URL-safe slug
// like "novated-lease". Used for both /categories/ and /tags/ paths.
exports.slugify = (value) =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")