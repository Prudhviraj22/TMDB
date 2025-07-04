import React, { useEffect, useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleAddtoWatchlist = (movieObj) => {
    let newWatchlist = [...watchlist, movieObj];
    localStorage.setItem("Movies", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
    console.log(newWatchlist);
  };

  let handleRemovefromWatchlist = (input) => {

    const idToRemove = typeof input ==="object" ? input.id : input;
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != idToRemove;
    });
    setWatchlist(filteredWatchlist);
    localStorage.setItem("Movies", JSON.stringify(filteredWatchlist));
    console.log(filteredWatchlist);
  };
  useEffect(() => {
    let storedWatchlist = localStorage.getItem("Movies");
    if (!storedWatchlist) {
      return;
    }
    setWatchlist(JSON.parse(storedWatchlist));
  }, []);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movies
                  handleAddtoWatchlist={handleAddtoWatchlist}
                  handleRemovefromWatchlist={handleRemovefromWatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                handleRemovefromWatchlist={handleRemovefromWatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
