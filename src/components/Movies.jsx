import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

const Movies = ({ handleAddtoWatchlist, handleRemovefromWatchlist, watchlist}) => {
  const [movies, setMovies] = useState([]);
  const [Pageno, setPageno] = useState(1);

  const handlePrev = () => {
    // Used this function  to handle the page to move to previous page on Pagination
    if (Pageno === 1) {
      setPageno(Pageno);
    } else {
      setPageno(Pageno - 1);
    }
  };

  const handleNext = () => {
    // Used this function  to handle the page to move to next page on Pagination
    setPageno(Pageno + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=934b45135ab0292aa484f87726c0366d&language=en-US&page=${Pageno}
`
      )
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      });
  }, [Pageno]);
  return (
    <div className="p-5">
      <div className="text-2xl font-bld text-center m-5 "> Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard  
              movieObj={movieObj}
              key={movieObj.id}
              name={movieObj.original_title}
              poster_path={movieObj.poster_path}
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemovefromWatchlist={handleRemovefromWatchlist}
              watchlist ={watchlist}
            />
          );
        })}
      </div>
      <Pagination
        Pageno={Pageno}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
};

export default Movies;
