import { Request, Response } from "express";
import Movie from "../models/movieSchema";
import Theater from "../models/theaterSchema";
import movieHelper from "../helpers/movieHelper";
import Location from "../models/locationSchema";
import theaterHelper from "../helpers/theaterHelper";
import stripePaymentService from "../helpers/stripePaymentHelper";
import User from "../models/userSchema";
import userHelper from "../helpers/userHelper";
import mongoose from "mongoose";
import Booking from "../models/bookingSchema";
import { ObjectId } from "mongodb";
import Wallet from "../models/userWalletSchema";
import Banner from "../models/bannerSchema";



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

  bookingDataPost:async(req:Request,res:Response)=>{
    try {
      const bookingdata = req.body
      const user = await User.findOne({_id:bookingdata.userId})
      const userMailId=user?.email
      const bookingSeatsQty = bookingdata.ticketCount
      const totalTicketAmount = bookingdata.ticketPrice*bookingSeatsQty

      if(bookingdata.gateway==='stripe'){
        const stripeCheckoutURL = await stripePaymentService.generateStripePaymentUrl(bookingdata.userId,userMailId,bookingdata.movieName,totalTicketAmount)

        res.json({paymentURL:stripeCheckoutURL,status:'success'})

      }
  
      
    } catch (error) {
      console.log("error",error)
    }
  },
  bookingCreate:async(req:Request,res:Response)=>{
    try {
      const bookdata = req.body
      const user = await User.findOne({_id:bookdata.userId})
      const userMailId=user?.email
      const bookingSeatsQty = bookdata.ticketCount
      const totalTicketAmount = bookdata.ticketPrice*bookingSeatsQty
      bookdata.totalTicketAmount=totalTicketAmount
      bookdata.userMailId=userMailId
      bookdata._id= new mongoose.Types.ObjectId() //creating object id for documnet for checcking it initially

      console.log('bkk',bookdata)




      if(bookdata.paymentStatus==='success'){
        const response=await userHelper.createBooking(bookdata)
        if(response){
          res.json({bookingObj:response,status:'success'})

        }else{
          res.json({message:'Already created booking '})

        }



      }else{
        res.json({message:'booking failed',status:"failed"})
      }
  
      
    } catch (error) {
      console.log("error creating booking in controller",error)
    }
  },

  bookedSeats:async(req:Request,res:Response)=>{
    try {
      const result = await userHelper.findBookedSeats(req.body)
      res.json({status:'success',bookedSeats:result})
    } catch (error) {
      res.json({status:'failed',message:'could not get booked seats result',error:error})
    }
  },
  getMovieInfo:async(req:Request,res:Response)=>{
    try {
      const result = await movieHelper.searchMovieById(req.params.id)
      res.json({status:'success',movie:result})
    } catch (error) {
      res.json({status:'failed',message:'could not get movie result',error:error})
    }
  },
  getbanners:async(req:Request,res:Response)=>{
    try {
      const result = await Banner.find({bannerState:true})
      res.json({status:'success',banners:result})
    } catch (error) {
      res.json({status:'failed',message:'could not get banner result',error:error})
    }
  },


  getUserBookings:async(req:Request,res:Response)=>{
    try {
      const result = await Booking.find({userId:new mongoose.Types.ObjectId(req.params.id)})
      res.json({status:'success',bookings:result})
    } catch (error) {
      res.json({status:'failed',message:'could not get user booking result',error:error})
    }
  },
  getUserProfileInfo:async(req:Request,res:Response)=>{
    try {
      const result = await User.findOne({_id:new mongoose.Types.ObjectId(req.params?.id)})
      const wallet = await Wallet.findOne({userId:new mongoose.Types.ObjectId(req.params?.id)})
      res.json({status:'success',user:result,wallet:wallet})
    } catch (error) {
      res.json({status:'failed',message:'could not get user result and wallet',error:error})
    }
  },
  addProfilePic:async(req:Request,res:Response)=>{
    try {
      const {user}:{user:string} = req.body
      console.log('form body',req.body)
      console.log('foy',user)

      console.log('file url',req.file)
      const imageURL=req.file?.path
      console.log('imageURL',imageURL)

      const updateResponse = await User.findByIdAndUpdate(
        { _id: new ObjectId(user) },
        { $push: { profilePic: imageURL } },
        { new: true, acknowledged: true } // Set acknowledged to true
      );
      
    console.log('updateResponse',updateResponse)
      res.json({status:'success',user:updateResponse})
    } catch (error) {
      console.log('error',error);
      
      res.json({status:'failed',message:'could not get user result',error:error})
    }
  },
  editUserProfileInfo:async(req:Request,res:Response)=>{
    try {
      const {id,name,city,mobile}:{id:string,name:string,city:string,mobile:string}  = req.body

      const phone = parseInt(mobile)
      console.log('mobile',mobile)
      console.log('req.body',req.body)
      console.log('phone',phone)

      const result = await User.findByIdAndUpdate({_id:new ObjectId(id)},{$set:{name:name,mobile:phone,city:city}},{ new: true, acknowledged: true })
      res.json({status:'success',user:result})
    } catch (error) {
      console.log('error',error)
      res.json({status:'failed',message:'could not update user details',error:error})
    }
  },
  cancelBooking:async(req:Request,res:Response)=>{
    try {
      const bookingId  = req.params?.id
      const response = await userHelper.cancelBooking(bookingId)

      res.json({status:'success',updatedData:response})
    } catch (error) {
      console.log('error',error)
      res.json({status:'failed',message:'could not cancel booking',error:error})
    }
  },



};








export default userController;
