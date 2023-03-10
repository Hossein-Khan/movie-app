export interface FetchedMovieList {
  [key: string]: {
    openingText: string;
    releaseDate: string;
    title: string;
  };
}

export default interface MovieModel {
  id?: string;
  title: string;
  releaseDate: string;
  openingText: string;
}
