export const IMG_URL = "https://image.tmdb.org/t/p";
const API_KEY = "44b2281bf382e323fd75bd4c3db3fe8d";
const API_URL = "https://api.themoviedb.org/3";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getNowPlaying() {
  return fetch(
    `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((res) => res.json());
}
