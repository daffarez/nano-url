import isURL from "validator/lib/isURL";

export const normalizeUrl = (input: string): string | null => {
  let url = input.trim();

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  const valid = isURL(url, {
    protocols: ["http", "https"],
    require_protocol: true,
  });

  if (!valid) return null;

  return url;
};
