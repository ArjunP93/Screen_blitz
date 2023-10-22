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
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const emailservice_1 = require("../emailService/emailservice");
const mongodb_1 = require("mongodb");
const userWalletSchema_1 = __importDefault(require("../models/userWalletSchema"));
const userHelper = {
    blockedStatusUser: (objId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield userSchema_1.default.findOne({ _id: objId });
            return response === null || response === void 0 ? void 0 : response.blockedStatus;
        }
        catch (error) {
            console.log("canot fetch userdata");
        }
    }),
    findBookedSeats: (obj) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("vles in aggregation", obj);
            const result = yield bookingSchema_1.default.aggregate([
                {
                    $match: {
                        bookingStatus: "confirmed",
                        showDate: obj.date,
                        showTime: obj.show,
                        screenId: new mongoose_1.default.Types.ObjectId(obj.screen),
                        theaterName: obj.theater,
                        movieId: new mongoose_1.default.Types.ObjectId(obj.movie),
                    },
                },
            ]);
            const bookedSeatsArray = result.map((obj) => obj.bookedSeats).flat();
            return bookedSeatsArray;
        }
        catch (error) {
            console.log("canot fetch booked seats data in  aggregation", error);
        }
    }),
    createBooking: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dataExists = yield bookingSchema_1.default.findOne({ paymentId: data.paymentId });
            console.log("dataaaa dataExists", dataExists);
            if (dataExists) {
                return false;
            }
            else {
                const bookObj = new bookingSchema_1.default({
                    _id: data._id,
                    userId: data.userId,
                    email: data.userMailId,
                    showDate: data.showDate,
                    showTime: data.selectedShow,
                    paymentId: data.paymentId,
                    paymentStatus: data.paymentStatus,
                    movieName: data.movieName,
                    screenName: data.selectedScreen,
                    screenId: new mongoose_1.default.Types.ObjectId(data.screenId),
                    theaterName: data.selectedTheater,
                    theaterId: new mongoose_1.default.Types.ObjectId(data.theaterId),
                    bookedSeats: data.selectedSeats,
                    totalAmount: data.totalTicketAmount,
                    ticketCount: data.ticketCount,
                    movieId: data.movieId,
                });
                const response = yield bookObj.save();
                (0, emailservice_1.sendEmailService)().sendEmail(data.userMailId, "booking confirmation", data._id.toString());
                return response;
            }
        }
        catch (error) {
            console.log("error creating booking", error);
        }
    }),
    cancelBooking: (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            const oldBookingData = yield bookingSchema_1.default.findOne({
                _id: new mongodb_1.ObjectId(bookingId),
            });
            if (!oldBookingData) {
                throw new Error("Booking not found");
            }
            const userId = oldBookingData.userId;
            const currentDate = new Date();
            const currentDateString = currentDate.toISOString().split("T")[0];
            const wallet = yield userWalletSchema_1.default.findOne({ userId });
            if (!wallet) {
                throw new Error("Wallet not found");
            }
            const oldBalance = wallet.balance || 0;
            const newBalance = oldBalance + (oldBookingData.totalAmount || 0);
            const transactionObj = {
                transactionType: "credit",
                date: currentDateString,
                amount: oldBookingData.totalAmount || 0,
                previousTotal: oldBalance,
            };
            const walletUpdate = yield userWalletSchema_1.default.findByIdAndUpdate({ _id: wallet._id }, {
                $set: { userId, balance: newBalance },
                $push: { transactions: transactionObj },
            }, { new: true, session });
            const bookingUpdate = yield bookingSchema_1.default.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(bookingId) }, { $set: { bookingStatus: "cancelled" } }, { new: true, session });
            yield session.commitTransaction();
            session.endSession();
            return { wallet: walletUpdate, booking: bookingUpdate };
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    })
};
exports.default = userHelper;
