
export async function getPopularSeries() { //popular series for users.
  const response = await fetch(`${import.meta.env.VITE_URL}/populars`)
  const data = await response.json();
  return data.results;
}
export async function getTrailerSerie(serieId) { //trailer of serie ID
  if (!serieId) return null;
    const response = await fetch(`${import.meta.env.VITE_URL}/trailer/${serieId}`)

  const data = await response.json();
  const trailer = data.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  );

  return trailer ? trailer.key : null;
}

export async function getDetailsOfSerie(serieId) { //details of serie
    if (!serieId) return null;
    const response = await fetch(`${import.meta.env.VITE_URL}/details/${serieId}`)

  const data = await response.json();
  return data;
}
export async function getAiringTodaySerie() { //series of tv that today is a new episodio
    const response = await fetch(`${import.meta.env.VITE_URL}/airing-today`)

  const data = await response.json();
  return data;
}


export async function getRecommendationsSerie(serieId) {
    if (!serieId) return null;
    const response = await fetch(`${import.meta.env.VITE_URL}/trailer/${serieId}`)

  const data = await response.json();
  return data;
}

//Top ten series of popular...
export async function topTenSeries() {
    const response = await fetch(`${import.meta.env.VITE_URL}/populars`)

  const data = await response.json();
  return data.results;
}

export async function getPremiereSer() {

    const response = await fetch(`${import.meta.env.VITE_URL}/premiere-series`)
  const data = await response.json();
  return data.results;
}