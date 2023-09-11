import { Request, Response } from "express";
import Theater from "../models/theaterSchema";
import Movie from "../models/movieSchema";
import Screen from "../models/screenSchema";
import constants from "../assets/constants";

const theaterController = {
  addMovie: async (req: Request, res: Response) => {
    try {
      

      const movieURLTmdb = `${constants.tmdbMovieBaseURL}${req.body.poster_path}`;
      const movieBackgroundURLTmdb = `${constants.tmdbMovieBaseURL}${req.body.backdrop_path}`;

      // console.log('movie data request body',movieData)
      const movieExist = await Movie.findOne({ movieName: req.body.title });
      if (movieExist) {
        res.json({
          created: false,
          status: "failed",
          message: "movie already exists",
        });
      } else {
        const movieObj = new Movie({
          movieName: req.body.title,
          language: req.body.original_language,
          movieId: req.body.id,
          releaseDate: req.body.release_date,
          poster: movieURLTmdb,
          backgroundPoster: movieBackgroundURLTmdb,
          overview: req.body.overview,
        });
        // console.log('movieObj',movieObj)
        await movieObj.save();

        res.json({
          message: "movie added successfully",
          created: true,
          status: "success",
        });
      }
    } catch (error) {
      res.json({ message: error, created: false });
    }
  },
  getMovies: async (req: Request, res: Response) => {
    try {
      console.log("inside get movies");
      const moviesList = await Movie.find();
      console.log("inside moviesList", moviesList);

      res.json({ movieData: moviesList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch movies", status: "failed", error });
    }
  },
  getScreens: async (req: Request, res: Response) => {
    try {
      const screenList = await Screen.find();
      res.json({ screenData: screenList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch movies", status: "failed", error });
    }
  },
  deleteMovie:async(req:Request,res:Response)=>{
    try {
      const id = req.body.movie_id
      console.log('req.body',req.body)
      const response = await Movie.deleteOne({_id:id})
      res.json({status:"success",message:'Movie removed successfully'})
    } catch (error) {
      res.json({status:'failed',message:'Could not remove movie',error})
    }
  },
};

export default theaterController;
