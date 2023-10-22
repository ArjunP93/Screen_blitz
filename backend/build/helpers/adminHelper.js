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
const adminHelper = {
    adminChartData: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield bookingSchema_1.default.aggregate([
            {
                $match: {
                    $or: [{ bookingStatus: "confirmed" }, { bookingStatus: "cancelled" }]
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        status: "$bookingStatus"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: { month: "$_id.month" },
                    data: {
                        $push: { status: "$_id.status", count: "$count" }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: { $toInt: "$_id.month" },
                    data: 1
                },
            },
            {
                $sort: {
                    month: 1
                }
            }
        ]);
        // console.log('response aggregation chart data', response);
        const result = Array.from({ length: 12 }, (_, index) => {
            const monthData = response.find(item => item.month === (index + 1));
            return monthData ? monthData : { data: null, month: index + 1 };
        });
        // .map((item,index) => ({
        //   data: item.data,
        //   month: item.data ? item.month : index+1
        // }));
        console.log('requiredData', result);
        return result;
    }),
    adminDashInfo: () => __awaiter(void 0, void 0, void 0, function* () {
        const totalBookings = yield bookingSchema_1.default.countDocuments({});
        const confirmedBookings = yield bookingSchema_1.default.countDocuments({ bookingStatus: 'confirmed' });
        const cancelledBookings = yield bookingSchema_1.default.countDocuments({ bookingStatus: 'cancelled' });
        const totalRevenue = yield bookingSchema_1.default.aggregate([
            { $match: { bookingStatus: 'confirmed' } },
            { $group: {
                    _id: null,
                    revenue: { $sum: '$totalAmount' }
                } }
        ]);
        return { totalBookings: totalBookings, confirmedBookings: confirmedBookings, cancelledBookings: cancelledBookings, totalRevenue: totalRevenue };
    })
};
exports.default = adminHelper;
