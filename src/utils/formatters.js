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

export const formatVoteCount = (voteCount) => {
  if (voteCount >= 1000) {
    return `${Math.round(voteCount / 100) / 10}k`;
  }
  return voteCount;
};

export const formatGenres = (genres, sliceCount = 2) => {
  if (!genres || genres.length === 0) return "N/A";

  return genres.slice(0, sliceCount).map((genre) => (
    <span
      key={genre.name}
      className="border border-gray-300 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm"
    >
      {genre.name}
    </span>
  ));
};
