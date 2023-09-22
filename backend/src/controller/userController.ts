import { Request, Response } from "express";
import Movie from "../models/movieSchema";
import Theater from "../models/theaterSchema";
import movieHelper from "../helpers/movieHelper";
import Location from "../models/locationSchema";
import theaterHelper from "../helpers/theaterHelper";

const userController = {
  getAllMovies: async (req: Request, res: Response) => {
    try {
      const moviesList = await Movie.find().sort({releaseDate:-1});

      res.json({ movieData: moviesList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch movies", status: "failed", error });
    }
  },
  getAllLocations: async (req: Request, res: Response) => {
    try {
      const locationList = await Location.find();

      res.json({ locData: locationList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch locations", status: "failed", error });
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

  moviePageData: async (req: Request, res: Response) => {
    try {
      const location = req.body.location;
      const movie = req.body.movie
      
     
      const aggregationResResults = await theaterHelper.theatersForMovie(location,movie)
      res.json({ status: "success", results: aggregationResResults });
    } catch (error) {
      res.json({ message: "could not fetch data", status: "failed", error });
    }
  },
};





export default userController;
