import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Typography,
  Input,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import { MovieTMDBCard } from "../../card/MovieTMDBCard";

export function AddMovieForm() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tmdbData, setTmdbData] = useState([]);


  const submitSearchHandle = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&api_key=${
          import.meta.env.VITE_TMDB_api_key
        }`
      )
      .then((response) => {
        if (response.status === 200) {
          
          setTmdbData(response?.data?.results);
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="m-2 " style={{ maxHeight: "400px", overflowY: "auto"}}>
      <div className="relative flex w-full gap-2 lg:w-max ml-auto p-1">
        <Input
          type="search"
          label="Type here..."
          color="deep-purple"
          value={searchKeyword}
          onChange={(e) => {
            setSearchKeyword(e.target.value);
          }}
        />
        <Button
          onClick={submitSearchHandle}
          size="sm"
          className="!absolute right-2 top-2 rounded"
          color="deep-purple"
        >
          Search
        </Button>
      </div>
      <div className=" flex flex-wrap ">
        {tmdbData.length > 0 ? (
          tmdbData.map((movie, index) => (
            <MovieTMDBCard key={index} data={movie} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
