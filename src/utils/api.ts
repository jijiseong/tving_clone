export const IMG_URL = "https://image.tmdb.org/t/p";
const API_KEY = "44b2281bf382e323fd75bd4c3db3fe8d";
const API_URL = "https://api.themoviedb.org/3";

export interface IMovie {
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

export interface IGetMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: false;
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

export function getTopRated() {
  return fetch(
    `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`
  ).then((res) => res.json());
}

export function getMovieDetail(id: string) {
  return fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`).then(
    (res) => res.json()
  );
}
