import { useState } from 'react'
import css from './App.module.css'
import type { Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'
import SearchBar from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <div><Toaster/></div>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {movies.length > 0 ? <MovieGrid items={movies} /> : {toast.error("No movies found for your request.")}}
    </div>
  )
}

export default App
