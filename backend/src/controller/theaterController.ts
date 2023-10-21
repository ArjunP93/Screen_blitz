import { Request, Response } from "express";
import Theater from "../models/theaterSchema";
import Movie from "../models/movieSchema";
import Screen from "../models/screenSchema";
import constants from "../assets/constants";
import { ObjectId } from "mongodb";

import mongoose from "mongoose";
import Location from "../models/locationSchema";
import theaterHelper from "../helpers/theaterHelper";

const theaterController = {
  addMovie: async (req: Request, res: Response) => {
    try {
      const movieURLTmdb = `${constants.tmdbMovieBaseURL}${req.body.poster_path}`;
      const movieBackgroundURLTmdb = `${constants.tmdbMovieBaseURL}${req.body.backdrop_path}`;

      // console.log('movie data request body',movieData)
      const movieExist = await Movie.findOne({ movieName: req.body.title });

      if (movieExist) {
        const theaterIdExists = await Movie.findOne({
          movieName: req.body.title,
          theaterIds: { $in: [new ObjectId(req.body.theaterId)] },
        });

        if (theaterIdExists) {
          res.json({
            created: false,
            status: "failed",
            message: "movie already exists",
          });
        } else {
          console.log(" inside else theaterIdExists");

          const respObj = await Movie.findOneAndUpdate(
            { movieName: req.body.title },
            { $push: { theaterIds: new ObjectId(req.body.theaterId) } },
            { new: true }
          );
          res.json({
            addedMovObj: respObj,
            message: "movie added successfully",
            created: true,
            status: "success",
          });
        }
      } else {
        const movieObj = new Movie({
          movieName: req.body.title,
          language: req.body.original_language,
          movieId: req.body.id,
          releaseDate: new Date(req.body.release_date),
          poster: movieURLTmdb,
          backgroundPoster: movieBackgroundURLTmdb,
          overview: req.body.overview,
          theaterNames: req.body.theaterName,
          theaterIds: new ObjectId(req.body.theaterId),
        });
        const resObj = await movieObj.save();
        console.log("movieObj", resObj);

        res.json({
          addedMovObj: resObj,
          message: "movie added successfully",
          created: true,
          status: "success",
        });
      }
    } catch (error) {
      res.json({ message: error, created: false });
    }
  },
  addScreen: async (req: Request, res: Response) => {
    try {
      const { show1, show2, show3, show4, show5, show6, ...rest } = req.body;
      const shows = [
        {_id:new ObjectId(), show1: show1, bookedSeats: [] },
        {_id:new ObjectId(), show2: show2, bookedSeats: [] },
        {_id:new ObjectId(), show3: show3, bookedSeats: [] },
        {_id:new ObjectId(), show4: show4, bookedSeats: [] },
        {_id:new ObjectId(), show5: show5, bookedSeats: [] },
        {_id:new ObjectId(),show6: show6, bookedSeats: [] },
      ];

      const reqObj = { ...rest, shows };
      const screenExist = await Screen.findOne({
        screenName: reqObj.screenName,
        theaterId: reqObj.theaterId,
      });

      if (screenExist) {
        res.json({ message: "screen already exists", created: false });
      } else {
        const screenObj = new Screen({
          theaterName: reqObj.theaterName,
          theaterId: new ObjectId(reqObj.theaterId),
          screenName: reqObj.screenName,
          rows: reqObj.Rows,
          columns: reqObj.Columns,
          shows: reqObj.shows,
          ticketRate: reqObj.ticketRate,
        });
        const resSaveScreen = await screenObj.save();
        res.json({
          addedScreenObj: resSaveScreen,
          message: "Screen added successfully",
          created: true,
          status: "success",
        });
      }
    } catch (error) {}
  },
  getMovies: async (req: Request, res: Response) => {
    try {
      const searchTheaterId = req.params?.id;

      const moviesList = await Movie.find({
        theaterIds: { $in: [new ObjectId(searchTheaterId)] },
      }).sort({ releaseDate: -1 });

      res.json({ movieData: moviesList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch movies", status: "failed", error });
    }
  },
  getScreens: async (req: Request, res: Response) => {
    try {
      const id = req.params?.id;
      
      const screenList = await Screen.find({ theaterId: new ObjectId(id) });
      res.json({ screenData: screenList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch screen", status: "failed", error });
    }
  },
  deleteMovie: async (req: Request, res: Response) => {
    try {
      const {moviId,theater} = req.params;
      

      const screenResult = await Screen.updateMany({ theaterId:theater, movieId:moviId  }, { $set: { movieName: '', movieId:null} });
      const response = await Movie.deleteOne({ _id: moviId });
      res.json({ status: "success", message: "Movie removed successfully" });
    } catch (error) {
      console.log(error)
      res.json({ status: "failed", message: "Could not remove movie", error });
    }
  },

  deleteScreen: async (req: Request, res: Response) => {
    try {
      const id = req.params?.id;
      const response = await Screen.deleteOne({ _id: id });
      res.json({ status: "success", message: "Screen removed successfully" });
    } catch (error) {
      res.json({ status: "failed", message: "Could not remove Screen", error });
    }
  },
  allocateScreen: async (req: Request, res: Response) => {
    try {
      const reqData = req.body;
      if (reqData.movie !== "" && reqData.screen !== "") {
        const movieTitle = await Movie.findOne({
          _id: new ObjectId(reqData.movie),
        });
        console.log("movieTitle", movieTitle);

        const response = await Screen.updateOne(
          { _id: new ObjectId(reqData.screen) },
          {
            $set: {
              movieId: new ObjectId(reqData.movie),
              movieName: movieTitle?.movieName,
            },
          }
        );
        console.log("response", response);
        res.json({ status: "success", message: "movie allocated in screen" });
      } else {
        res.json({
          status: "failed",
          message: "Could not allocate empty movie and Screen",
        });
      }
    } catch (error) {
      res.json({
        status: "failed",
        message: "Could not allocate movie in  Screen",
        error,
      });
    }
  },
  addProfilePic:async(req:Request,res:Response)=>{
    try {
      const {theater}:{theater:string} = req.body
      console.log('form body',req.body)

      console.log('file url',req.file)
      const imageURL=req.file?.path
      console.log('imageURL',imageURL)

      const updateResponse = await Theater.findByIdAndUpdate(
        { _id: new ObjectId(theater) },
        { $set: { profilePic: imageURL } },
        { new: true, acknowledged: true } // Set acknowledged to true
      );
      
      res.json({status:'success',theater:updateResponse})
    } catch (error) {
      console.log('error',error);
      
      res.json({status:'failed',message:'could not get theater result',error:error})
    }
  },
  getTheaterProfile: async (req: Request, res: Response) => {
    try {
      const id = req.params?.id;
      
      const profile = await Theater.findOne({ _id: new ObjectId(id) });
      const locations = await Location.find({})
      const screens = await Screen.countDocuments({theaterId:new ObjectId(id)})
      const result={...profile,screens:screens}
      res.json({ theater:result , status: "success" ,locations:locations });
    } catch (error) {
      res.json({ message: "could not get theater profile", status: "failed", error });
    }
  },
  editTheaterProfileInfo:async(req:Request,res:Response)=>{
    try {
      const {id,name,location,mobile,description}:{id:string,name:string,location:string,mobile:string,description:string}  = req.body

      const phone = parseInt(mobile)
      console.log('mobile',mobile)
      console.log('req.body',req.body)
      const screens = await Screen.countDocuments({theaterId:new ObjectId(id)})

      const result = await Theater.findByIdAndUpdate({_id:new ObjectId(id)},{$set:{theaterName:name,mobile:phone,location:location,description:description}},{ new: true, acknowledged: true })
      res.json({status:'success',theater:result,screens:screens})
    } catch (error) {
      console.log('error',error)
      res.json({status:'failed',message:'could not update theater details',error:error})
    }
  },
  getChartData:async(req:Request,res:Response)=>{
    try {
       const theater = req.params.id
    const chartDataResult = await theaterHelper.chartData(theater)
    const dashInfo = await theaterHelper.dashInfo(theater)
    res.json({status:"success",dashInfo:dashInfo, chartData:chartDataResult})

    } catch (error) {
      console.log('error',error)
      res.json({status:'failed',message:'could get  theater dash  details',error:error})
    
    }
   
  },

};

export default theaterController;
