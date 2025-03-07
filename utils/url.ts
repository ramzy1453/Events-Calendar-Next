export const buildUrl = <T>(base: string, params: T) => {
  const queryString = Object.entries(params as Record<string, string>)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    )
    .join("&");

  console.log(`${base}${queryString ? `?${queryString}` : ""}`);
  return `${base}${queryString ? `?${queryString}` : ""}`;
};
