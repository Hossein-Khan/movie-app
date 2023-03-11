import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import MovieModel, { FetchedMovie } from "./models/MovieModel";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [hasError, setHasError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMoviesHandler = useCallback(async function () {
    try {
      setHasError(null);
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-4ee6a-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );

      if (response.status !== 200) {
        throw new Error("Somthing went wrong!");
      }

      const data: FetchedMovie = await response.json();

      const receivedMovies: MovieModel[] = [];
      for (const key in data) {
        receivedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }

      setMovies(receivedMovies);
    } catch (error: unknown) {
      setHasError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMovieHandler = async function (movie: MovieModel) {
    try {
      const response = await fetch(
        "https://react-http-4ee6a-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status !== 200) {
        throw new Error("Somthing went wrong!");
      }
      const data = await response.json();
    } catch (error) {
      setHasError((error as Error).message);
    } finally {
    }
  };

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
