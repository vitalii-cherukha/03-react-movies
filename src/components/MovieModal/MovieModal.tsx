import { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

const basicsImgUrl: string = 'https://image.tmdb.org/t/p/w500';

interface MovieModalProps {
  selectedMovie: Movie;
}

const MovieModal = ({ selectedMovie }: MovieModalProps) => {
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button className={css.closeButton} aria-label="Close modal">
          &times;
        </button>
        <img
          src={basicsImgUrl + selectedMovie.backdrop_path}
          alt={selectedMovie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <p>
            <strong>Release Date: </strong>
            {selectedMovie.release_date}
          </p>
          <p>
            <strong>Rating: </strong>
            {selectedMovie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
