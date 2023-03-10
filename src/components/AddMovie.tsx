import React, { FormEvent, useRef } from "react";
import MovieModel from "../models/MovieModel";

import styles from "./AddMovie.module.css";

type AddMovieProps = {
  onAddMovie: (movie: MovieModel) => void;
};

const AddMovie = function (props: AddMovieProps): JSX.Element {
  const titleRef = useRef<HTMLInputElement>(null);
  const openingTextRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: FormEvent) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current!.value,
      openingText: openingTextRef.current!.value,
      releaseDate: releaseDateRef.current!.value,
    };

    props.onAddMovie(movie);
  }
  return (
    <form onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={styles.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows={5} id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={styles.control}>
        <label htmlFor="date">Release Date</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
};

export default AddMovie;
