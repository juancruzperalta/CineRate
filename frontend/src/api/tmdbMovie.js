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
export async function getCreditsOfMovie(movieId) {
    if (!movieId) return null;
    const response = await fetch(`${import.meta.env.VITE_MOVIE_URL}/credits/${movieId}`)

  const data = await response.json();
  return data;
}
export async function getSimilarOfMovie(movieId) {
    if (!movieId) return null;
    const response = await fetch(`${import.meta.env.VITE_MOVIE_URL}/similar/${movieId}`)

  const data = await response.json();
  return data;
}
export async function getPremiereMovie() {
    const response = await fetch(`${import.meta.env.VITE_MOVIE_URL}/premiere`)

  const data = await response.json();
  return data;
}