"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const movieSchema_1 = __importDefault(require("../models/movieSchema"));
const theaterSchema_1 = __importDefault(require("../models/theaterSchema"));
const mongodb_1 = require("mongodb");
const theaterHelper = {
    blockedStatusTheater: (objId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield theaterSchema_1.default.findOne({ _id: objId });
            return response === null || response === void 0 ? void 0 : response.blockedstatus;
        }
        catch (error) {
            console.log("cannot fetch theater details");
        }
    }),
    theatersForMovie: (loc, movie) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieobj = yield movieSchema_1.default.findOne({ _id: new mongodb_1.ObjectId(movie) });
            const response = yield theaterSchema_1.default.aggregate([
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
                        "screen.movieId": new mongodb_1.ObjectId(movie),
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
        }
        catch (error) {
            console.log("error in aggregation", error);
        }
    }),
    chartData: (theaterId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("theaterId", theaterId);
        const response = yield bookingSchema_1.default.aggregate([
            {
                $match: { theaterId: new mongodb_1.ObjectId(theaterId) },
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
    }),
    dashInfo: (theaterId) => __awaiter(void 0, void 0, void 0, function* () {
        const totalBookings = yield bookingSchema_1.default.countDocuments({
            theaterId: new mongodb_1.ObjectId(theaterId),
        });
        const confirmedBookings = yield bookingSchema_1.default.countDocuments({
            theaterId: new mongodb_1.ObjectId(theaterId),
            bookingStatus: "confirmed",
        });
        const cancelledBookings = yield bookingSchema_1.default.countDocuments({
            theaterId: new mongodb_1.ObjectId(theaterId),
            bookingStatus: "cancelled",
        });
        const totalRevenue = yield bookingSchema_1.default.aggregate([
            {
                $match: {
                    theaterId: new mongodb_1.ObjectId(theaterId),
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
    }),
};
exports.default = theaterHelper;
