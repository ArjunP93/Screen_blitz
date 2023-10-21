import Booking from "../models/bookingSchema";
import Movie from "../models/movieSchema";
import Theater from "../models/theaterSchema";
import { ObjectId } from "mongodb";

const theaterHelper = {
  blockedStatusTheater: async (objId: String) => {
    try {
      const response = await Theater.findOne({ _id: objId });
      return response?.blockedstatus;
    } catch (error) {
      console.log("cannot fetch theater details");
    }
  },
  theatersForMovie: async (loc: String, movie: string) => {
    try {
      const movieobj = await Movie.findOne({ _id: new ObjectId(movie) });

      const response = await Theater.aggregate([
        {
          $match: {
            location: loc,
            blockedstatus: false,
          },
        },
        {
          $lookup: {
            from: "screens",
            localField: "_id",
            foreignField: "theaterId",
            as: "screen",
          },
        },
        {
          $unwind: {
            path: "$screen",
            includeArrayIndex: "string",
          },
        },
        {
          $match: {
            "screen.movieId": new ObjectId(movie),
          },
        },
        {
          $project: {
            email: false,
            password: false,
            mobile: false,
            __v: false,
            string: false,
            screen: {
              theaterId: false,
              theaterName: false,
              __v: false,
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            blockedstatus: {
              $first: "$blockedstatus",
            },
            approvalStatus: {
              $first: "$approvalStatus",
            },
            theaterName: {
              $first: "$theaterName",
            },
            location: {
              $first: "$location",
            },
            screen: {
              $push: "$screen",
            },
          },
        },
      ]);

      // console.log('response agggregatoion',response)
      return { movie: movieobj, responseData: response };
    } catch (error) {
      console.log("error in aggregation", error);
    }
  },
  chartData: async (theaterId: string) => {
    console.log("theaterId", theaterId);
    const response = await Booking.aggregate([
      {
        $match: { theaterId: new ObjectId(theaterId) },
      },
      {
        $match: {
          $or: [{ bookingStatus: "confirmed" }, { bookingStatus: "cancelled" }],
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            status: "$bookingStatus",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { month: "$_id.month" },
          data: {
            $push: { status: "$_id.status", count: "$count" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: { $toInt: "$_id.month" },
          data: 1,
          // month: {"$_id.month"
          // $switch: {
          //   branches: [
          //     { case: { $eq: ["$_id.month", 1] }, then: "January" },
          //     { case: { $eq: ["$_id.month", 2] }, then: "February" },
          //     { case: { $eq: ["$_id.month", 3] }, then: "March" },
          //     { case: { $eq: ["$_id.month", 4] }, then: "April" },
          //     { case: { $eq: ["$_id.month", 5] }, then: "May" },
          //     { case: { $eq: ["$_id.month", 6] }, then: "June" },
          //     { case: { $eq: ["$_id.month", 7] }, then: "July" },
          //     { case: { $eq: ["$_id.month", 8] }, then: "August" },
          //     { case: { $eq: ["$_id.month", 9] }, then: "September" },
          //     { case: { $eq: ["$_id.month", 10] }, then: "October" },
          //     { case: { $eq: ["$_id.month", 11] }, then: "November" },
          //     { case: { $eq: ["$_id.month", 12] }, then: "December" }
          //   ],
          // default: "Invalid Month"
          // }
        },
        // data: 1
        // }
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    // console.log('response aggregation chart data', response);
    const result = Array.from({ length: 12 }, (_, index) => {
      const monthData = response.find((item) => item.month === index + 1);
      return monthData ? monthData : { data: null, month: index + 1 };
    });
    // .map((item,index) => ({
    //   data: item.data,
    //   month: item.data ? item.month : index+1
    // }));

    console.log("requiredData", result);

    return result;
  },
  dashInfo: async (theaterId: string) => {
    const totalBookings = await Booking.countDocuments({
      theaterId: new ObjectId(theaterId),
    });
    const confirmedBookings = await Booking.countDocuments({
      theaterId: new ObjectId(theaterId),
      bookingStatus: "confirmed",
    });
    const cancelledBookings = await Booking.countDocuments({
      theaterId: new ObjectId(theaterId),
      bookingStatus: "cancelled",
    });
    const totalRevenue = await Booking.aggregate([
      {
        $match: {
          theaterId: new ObjectId(theaterId),
          bookingStatus: "confirmed",
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);
    return {
      totalBookings: totalBookings,
      confirmedBookings: confirmedBookings,
      cancelledBookings: cancelledBookings,
      totalRevenue: totalRevenue,
    };
  },
};
export default theaterHelper;
