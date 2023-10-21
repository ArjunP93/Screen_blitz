import { Request, Response } from "express";
import User from "../models/userSchema";
import Theater from "../models/theaterSchema";
import Movie from "../models/movieSchema";
import Location from "../models/locationSchema";
import Banner from "../models/bannerSchema";
import adminHelper from "../helpers/adminHelper";

const adminController = {
  userFetch: async (req: Request, res: Response) => {
    try {
      const usersData = await User.find();
      console.log("db respomse data", usersData);
      res.json({ usersDetails: usersData });
    } catch (error) {
      res.json({ message: "couldn't fetch userdetails", error });
    }
  },

  theaterFetch: async (req: Request, res: Response) => {
    try {
      const theatersData = await Theater.find();
      console.log("db respomse data", theatersData);

      res.json({ theatersDetails: theatersData });
    } catch (error) {
      res.json({ message: "couldn't fetch theaterdetails", error });
    }
  },
  getAllMovies: async (req: Request, res: Response) => {
    try {
      const moviesList = await Movie.find().sort({ releaseDate: -1 });

      res.json({ movieData: moviesList, status: "success" });
    } catch (error) {
      res.json({ message: "could not fetch movies", status: "failed", error });
    }
  },
  addLocations: async (req: Request, res: Response) => {
    try {
      const newLocation = req.body.location;

      const locationExist = await Location.findOne({ location: newLocation });
      if (locationExist) {
        res.json({ message: "already exist", status: "failed" });
      } else {
        const newObjLoc = new Location({
          location: newLocation,
        });

        const response = await newObjLoc.save();

        res.json({
          message: "location addded",
          status: "success",
          location: response,
        });
      }
    } catch (error) {
      res.json({
        message: "could not add location",
        status: "error",
        error: error,
      });
    }
  },
  availableLocations: async (req: Request, res: Response) => {
    try {
      const responselist = await Location.find();
      res.json({ status: "success", locations: responselist });
    } catch (error) {
      res.json({
        message: "could not get locationlist",
        status: "error",
        error: error,
      });
    }
  },
  addBanners: async (req: Request, res: Response) => {
    try {
      console.log("bodyyy", req.body);
      const { title, description }: { title: string; description: string } =
        req.body;

      const image = req?.file?.path;

      const bannerExist = await Banner.findOne({ title: title });
      if (bannerExist) {
        res.json({ status: "failed", message: "banner already exists" });
      } else {
        const bannerObj = new Banner({
          title: title,
          description: description,
          bannerImage: image,
        });
        const response = await bannerObj.save();
        res.json({ status: "success", message: "banner added successfully" });
      }
    } catch (error) {
      res.json({
        message: "could not add banners",
        status: "error",
        error: error,
      });
    }
  },
  bannerList:async(req:Request,res:Response)=>{
    try {
      const bannerResults = await Banner.find({})
      res.json({bannerDetails: bannerResults,status:'success'})
    } catch (error) {
      console.log("error in list banner", error);
      res.json({ status: "error", error: error });
    }

  },
  activateBanner: async (req: Request, res: Response) => {
    try {
      const bannerState = req.body;
      console.log("bannerState", bannerState);

      await Banner.updateOne(
        { _id: bannerState.id },
        { $set: { bannerState: bannerState.state } }
      ).then(() => {
        res.json({ bannerState: bannerState.state });
      });
    } catch (error) {
      res.json({ message: "couldn't Activate or deactivate banner", error });
    }
  },
  deleteBanner: async (req: Request, res: Response) => {
    try {
      const bannerId = req.params.id;
      const response = await Banner.deleteOne({ _id: bannerId });
      res.json({ status: "success", message: "banner deleted successfully" });
    } catch (error) {
      console.log("error in delete banner", error);
      res.json({ status: "error", error: error });
    }
  },
  deleteLocation: async (req: Request, res: Response) => {
    try {
      const locId = req.params.id;
      await Location.deleteOne({ _id: locId });
      res.json({ status: "success", message: "delete success" });
    } catch (error) {
      res.json({
        message: "could not remove location",
        status: "error",
        error: error,
      });
    }
  },

  theaterApprove: async (req: Request, res: Response) => {
    console.log("backend therrerapprove");
    try {
      const approvalState = req.body;
      console.log("approvalState", approvalState);

      await Theater.updateOne(
        { _id: approvalState.id },
        { $set: { approvalStatus: approvalState.state } }
      ).then(() => {
        res.json({ approvalState: approvalState.state });
      });
    } catch (error) {
      res.json({ message: "couldn't Approve theater", error });
    }
  },
  theaterBlockUnblock: async (req: Request, res: Response) => {
    try {
      const blockStatus = req.body;
      await Theater.updateOne(
        { _id: blockStatus.id },
        { $set: { blockedstatus: blockStatus.state } }
      ).then(() => {
        if (blockStatus.state) {
          res.json({ block: blockStatus.state, message: "blocked" });
        } else {
          res.json({ block: blockStatus.state, message: "unblocked" });
        }
      });
    } catch (error) {
      res.json({ message: "cannot update blocked status of theater" });
    }
  },

  userApprove: async (req: Request, res: Response) => {
    try {
      const userApprovalState = req.body;

      await User.updateOne(
        { _id: userApprovalState.id },
        { $set: { blockedStatus: userApprovalState.state } }
      ).then(() => {
        res.json({ approvalState: userApprovalState.state });
      });
    } catch (error) {
      res.json({ message: "couldn't Approve user", error });
    }
  },
  getAdminChartData:async(req:Request,res:Response)=>{
    try {
    const chartDataResult = await adminHelper.adminChartData()
    const dashInfo = await adminHelper.adminDashInfo()
    res.json({status:"success",dashInfo:dashInfo, chartData:chartDataResult})

    } catch (error) {
      console.log('error',error)
      res.json({status:'failed',message:'could get  admin dash  details',error:error})
    
    }
   
  },
}

export default adminController;
