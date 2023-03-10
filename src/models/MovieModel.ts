export interface FetchedMovieList {
  count: number;
  next: null;
  previous: null;
  results: {
    characters: string[];
    created: string;
    director: string;
    edited: string;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];
  }[];
}

export default interface MovieModel {
  id: number;
  title: string;
  releaseDate: string;
  openingText: string;
}
