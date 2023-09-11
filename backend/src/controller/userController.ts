import { Request, Response } from "express";
import Movie from "../models/movieSchema";
import Theater from "../models/theaterSchema";
import movieHelper from "../helpers/movieHelper";

const userController = {
  getAllMovies: async (req: Request, res: Response) => {
    try {
      const moviesList = await Movie.find().sort({releaseDate:-1});

      res.json({ movieData: moviesList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch movies", status: "failed", error });
    }
  },

  searchMovie: async (req: Request, res: Response) => {
    try {
      const searchKey = req.body.searchKey;
     
      const searchMovieResults = await movieHelper.searchForMovie(searchKey)
      
      res.json({ status: "success", results: searchMovieResults });
    } catch (error) {
      res.json({ message: "could not fetch movies", status: "failed", error });
    }
  },
};

export default userController;
