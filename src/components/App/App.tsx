import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { getMovies } from '../../services/movieService';
import { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    const data = await getMovies(query);
    setMovies(data);
  };
  const onSelected = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className={css.app}>
      <SearchBar handleSubmit={handleSubmit} />
      <MovieGrid movies={movies} onSelected={onSelected} />
      {selectedMovie && <MovieModal selectedMovie={selectedMovie} />}
    </div>
  );
};

export default App;
