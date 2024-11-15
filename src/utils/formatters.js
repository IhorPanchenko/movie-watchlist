export const formatRuntime = (runtime) => {
  if (!runtime || runtime <= 0) return "N/A";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours} hr ${minutes} min`;
};

export const formatDate = (
  dateString,
  options = { year: "numeric", month: "long", day: "numeric" }
) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
