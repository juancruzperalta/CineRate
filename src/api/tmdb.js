const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularSeries() { //popular series for users.
  const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  const data = await response.json();
  return data.results;
}
export async function getTrailerSerie(serieId) { //trailer of serie ID
  if (!serieId) return null;
  const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/videos?language=es-ES`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  const data = await response.json();
  const trailer = data.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  );

  return trailer ? trailer.key : null;
}

export async function getDetailsOfSerie(serieId) { //details of serie
    console.log("VALOR RECIBIDO EN getDetailsOfSerie:", serieId);
  const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?language=en-US`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  const data = await response.json();
  return data;
}
export async function getAiringTodaySerie() { //series of tv that today is a new episodio
  
  const response = await 
fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  });
  const data = await response.json();
  return data;
}


export async function getRecommendationsSerie(serieId) {
  const serie = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/recommendations`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    accept: 'application/json',
    },
  });
  const data = await serie.json();
  return data;
}

//Top ten series of popular...
export async function topTenSeries() {
  const serieTop = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1`, {
    headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    accept: 'application/json',
    }
  })
  const data = await serieTop.json();
  return data.results;
}

export async function getPremiereSer() {
    const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const startDate = today.toISOString().slice(0, 10);
  const endDate = nextWeek.toISOString().slice(0, 10);

    const serieTop = await fetch(`https://api.themoviedb.org/3/discover/tv?language=es-ES&page=1&sort_by=first_air_date.asc&first_air_date.gte=${startDate}&first_air_date.lte=${endDate}`, {
    headers: {
     Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    accept: 'application/json',
    }
  })
  const data = await serieTop.json();
  return data.results;
}