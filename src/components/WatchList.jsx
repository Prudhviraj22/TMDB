import React, { useEffect, useState } from "react";
import genreMap from "../Utility/genre";

const WatchList = ({ watchlist, setWatchlist, handleRemovefromWatchlist }) => {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currGenre, setCurrGenre] = useState(["All Gernes"]);

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing = () => {
    let sortedIncreasinglist = [...watchlist].sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchlist([...sortedIncreasinglist]);
  };
  let sortDecreasing = () => {
    let sortedDecreasinglist = [...watchlist].sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchlist([...sortedDecreasinglist]);
  };

  // This functions are used to adjust the Popularity feature

  let popularityIncreasing = () => {
    let popularityIncreasinglist = [...watchlist].sort((movieA, movieB) => {
      return movieA.popularity - movieB.popularity;
    });
    setWatchlist([...popularityIncreasinglist]);
  };
  let popularityDecreasing = () => {
    let popularityDecreasinglist = [...watchlist].sort((movieA, movieB) => {
      return movieB.popularity - movieA.popularity;
    });
    setWatchlist([...popularityDecreasinglist]);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreMap[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
    console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre, index) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              key={index}
              className={
                currGenre == genre
                  ? " mx-4 bg-blue-400 flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold"
                  : "bg-gray-400/50 flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold mx-4"
              }
            >
              {genre}
            </div>
          );
        })}

        {/* <div className="bg-gray-400/50 flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold ">
          Action
        </div> */}
      </div>
      <div className="flex justify-center my-4"> 
        <input
          onChange={handleSearch}
          value={search}
          className="h-[3rem] w-[18rem] bg-gray-200/60 outline-none px-3 "
          type="text"
          placeholder="Search Movies"
        />
      </div>
      <div className=" overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>
                <span className="flex justify-center items-center gap-2">
                  <i
                    className="fa-solid fa-arrow-up hover:cursor-pointer hover:scale-110"
                    onClick={sortIncreasing}
                  ></i>
                  <span>Ratings</span>
                  <i
                    className="fa-solid fa-arrow-down hover:cursor-pointer hover:scale-110"
                    onClick={sortDecreasing}
                  ></i>
                </span>
              </th>

              <th>
                <span className="flex justify-center items-center gap-2">
                  <i
                    className="fa-solid fa-arrow-up hover:cursor-pointer hover:scale-110"
                    onClick={popularityIncreasing}
                  ></i>
                  <span>Popularity</span>
                  <i
                    className="fa-solid fa-arrow-down hover:cursor-pointer hover:scale-110"
                    onClick={popularityDecreasing}
                  ></i>
                </span>
              </th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currGenre=="All Genres"){
                return true;
              }else{
                return genreMap[movieObj.genre_ids[0]] ==currGenre
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="w-[10rem] h-[6rem]"
                        src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`}
                        alt=""
                      />
                      <div className="mx-10">{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreMap[movieObj.genre_ids[0]]}</td>

                    <td
                      onClick={() => handleRemovefromWatchlist(movieObj.id)}
                      className="text-red-800 cursor-pointer bg-yellow"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
