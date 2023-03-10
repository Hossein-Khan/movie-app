import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieModel, { FetchedMovieList } from "./models/MovieModel";

function App() {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [hasError, setHasError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMoviesHandler = useCallback(async function () {
    try {
      setHasError(null);
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films/");

      if (response.status !== 200) {
        throw new Error("Somthing went wrong!");
      }

      const data: FetchedMovieList = await response.json();
      //if(response.status)
      const receivedMovies = data.results.map(function (movie): MovieModel {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(receivedMovies);
    } catch (error: unknown) {
      setHasError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = (
    <React.Fragment>
      <p>There is nothing to show.</p>
      <p>Try fetching movies.</p>
    </React.Fragment>
  );
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (hasError) content = <p>{hasError}</p>;
  if (isLoading) content = <p>Loading data...</p>;
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
