import React from "react";

function MovieCard({
  movieObj,
  poster_path,
  name,
  handleAddtoWatchlist,
  handleRemovefromWatchlist,
  watchlist,
}) {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : "https://picsum.photos/180/270?grayscale"; // ✅ fallback

  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }
  return (
    <div
      className="h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300ms hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div onClick={()=>handleRemovefromWatchlist(movieObj)}  className="m-4 flex justify-center-8 w-[23px] items-center rounded-lg bg-gray-900/60">&#10060; </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="m-4 flex justify-center w-[23px] items-center rounded-lg bg-gray-900/60"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60 ">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
