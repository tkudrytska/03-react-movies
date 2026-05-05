import { useState } from "react";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
      {modal && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
