import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { getMovies } from '../../services/movieService';
import { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import toast from 'react-hot-toast';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const handleSubmit = async (query: string) => {
    const data = await getMovies(query);
    setIsEmpty(false);
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
    try {
      if (!data.length) {
        toast('No movies found for your request');
        setIsEmpty(true);
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelected = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const onClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar handleSubmit={handleSubmit} />
      <MovieGrid movies={movies} onSelected={onSelected} />
      {isEmpty && <p>Movies not found</p>}
      {isError && <ErrorMessage />}
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={onClose} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
