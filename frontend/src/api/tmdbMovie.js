export async function getPopularsMovies() {
    const response = await fetch(`${import.meta.env.VITE_MOVIE_URL}/populars`)

  const data = await response.json();
  return data.results;
}
export async function getDetailsOfMovie(movieId) {
    if (!movieId) return null;
    const response = await fetch(`${import.meta.env.VITE_MOVIE_URL}/details/${movieId}`)

  const data = await response.json();
  return data;
}