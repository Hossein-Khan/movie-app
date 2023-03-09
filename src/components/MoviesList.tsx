import React from "react";
import MovieModel from "../models/MovieModel";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

type MovieListProps = {
  movies: MovieModel[];
};
const MovieList = (props: MovieListProps) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
