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
const movieSchema_1 = __importDefault(require("../models/movieSchema"));
const movieHelper_1 = __importDefault(require("../helpers/movieHelper"));
const locationSchema_1 = __importDefault(require("../models/locationSchema"));
const theaterHelper_1 = __importDefault(require("../helpers/theaterHelper"));
const stripePaymentHelper_1 = __importDefault(require("../helpers/stripePaymentHelper"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const userHelper_1 = __importDefault(require("../helpers/userHelper"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema_1 = __importDefault(require("../models/bookingSchema"));
const mongodb_1 = require("mongodb");
const userWalletSchema_1 = __importDefault(require("../models/userWalletSchema"));
const bannerSchema_1 = __importDefault(require("../models/bannerSchema"));
const userController = {
    getAllMovies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const moviesList = yield movieSchema_1.default.find().sort({ releaseDate: -1 });
            res.json({ movieData: moviesList, status: "success" });
        }
        catch (error) {
            res.json({ message: "could not fetch movies", status: "failed", error });
        }
    }),
    getAllLocations: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const locationList = yield locationSchema_1.default.find();
            res.json({ locData: locationList, status: "success" });
        }
        catch (error) {
            res.json({ message: "could not fetch locations", status: "failed", error });
        }
    }),
    searchMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const searchKey = req.body.searchKey;
            const searchMovieResults = yield movieHelper_1.default.searchForMovie(searchKey);
            res.json({ status: "success", results: searchMovieResults });
        }
        catch (error) {
            res.json({ message: "could not fetch movies", status: "failed", error });
        }
    }),
    moviePageData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const location = req.body.location;
            const movie = req.body.movie;
            const aggregationResResults = yield theaterHelper_1.default.theatersForMovie(location, movie);
            res.json({ status: "success", results: aggregationResResults });
        }
        catch (error) {
            res.json({ message: "could not fetch data", status: "failed", error });
        }
    }),
    bookingDataPost: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookingdata = req.body;
            const user = yield userSchema_1.default.findOne({ _id: bookingdata.userId });
            const userMailId = user === null || user === void 0 ? void 0 : user.email;
            const bookingSeatsQty = bookingdata.ticketCount;
            const totalTicketAmount = bookingdata.ticketPrice * bookingSeatsQty;
            if (bookingdata.gateway === 'stripe') {
                const stripeCheckoutURL = yield stripePaymentHelper_1.default.generateStripePaymentUrl(bookingdata.userId, userMailId, bookingdata.movieName, totalTicketAmount);
                res.json({ paymentURL: stripeCheckoutURL, status: 'success' });
            }
        }
        catch (error) {
            console.log("error", error);
        }
    }),
    bookingCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookdata = req.body;
            const user = yield userSchema_1.default.findOne({ _id: bookdata.userId });
            const userMailId = user === null || user === void 0 ? void 0 : user.email;
            const bookingSeatsQty = bookdata.ticketCount;
            const totalTicketAmount = bookdata.ticketPrice * bookingSeatsQty;
            bookdata.totalTicketAmount = totalTicketAmount;
            bookdata.userMailId = userMailId;
            bookdata._id = new mongoose_1.default.Types.ObjectId(); //creating object id for documnet for checcking it initially
            console.log('bkk', bookdata);
            if (bookdata.paymentStatus === 'success') {
                const response = yield userHelper_1.default.createBooking(bookdata);
                if (response) {
                    res.json({ bookingObj: response, status: 'success' });
                }
                else {
                    res.json({ message: 'Already created booking ' });
                }
            }
            else {
                res.json({ message: 'booking failed', status: "failed" });
            }
        }
        catch (error) {
            console.log("error creating booking in controller", error);
        }
    }),
    bookedSeats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield userHelper_1.default.findBookedSeats(req.body);
            res.json({ status: 'success', bookedSeats: result });
        }
        catch (error) {
            res.json({ status: 'failed', message: 'could not get booked seats result', error: error });
        }
    }),
    getMovieInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield movieHelper_1.default.searchMovieById(req.params.id);
            res.json({ status: 'success', movie: result });
        }
        catch (error) {
            res.json({ status: 'failed', message: 'could not get movie result', error: error });
        }
    }),
    getbanners: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield bannerSchema_1.default.find({ bannerState: true });
            res.json({ status: 'success', banners: result });
        }
        catch (error) {
            res.json({ status: 'failed', message: 'could not get banner result', error: error });
        }
    }),
    getUserBookings: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield bookingSchema_1.default.find({ userId: new mongoose_1.default.Types.ObjectId(req.params.id) });
            res.json({ status: 'success', bookings: result });
        }
        catch (error) {
            res.json({ status: 'failed', message: 'could not get user booking result', error: error });
        }
    }),
    getUserProfileInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const result = yield userSchema_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId((_a = req.params) === null || _a === void 0 ? void 0 : _a.id) });
            const wallet = yield userWalletSchema_1.default.findOne({ userId: new mongoose_1.default.Types.ObjectId((_b = req.params) === null || _b === void 0 ? void 0 : _b.id) });
            res.json({ status: 'success', user: result, wallet: wallet });
        }
        catch (error) {
            res.json({ status: 'failed', message: 'could not get user result and wallet', error: error });
        }
    }),
    addProfilePic: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const { user } = req.body;
            console.log('form body', req.body);
            console.log('foy', user);
            console.log('file url', req.file);
            const imageURL = (_c = req.file) === null || _c === void 0 ? void 0 : _c.path;
            console.log('imageURL', imageURL);
            const updateResponse = yield userSchema_1.default.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(user) }, { $push: { profilePic: imageURL } }, { new: true, acknowledged: true } // Set acknowledged to true
            );
            console.log('updateResponse', updateResponse);
            res.json({ status: 'success', user: updateResponse });
        }
        catch (error) {
            console.log('error', error);
            res.json({ status: 'failed', message: 'could not get user result', error: error });
        }
    }),
    editUserProfileInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, name, city, mobile } = req.body;
            const phone = parseInt(mobile);
            console.log('mobile', mobile);
            console.log('req.body', req.body);
            console.log('phone', phone);
            const result = yield userSchema_1.default.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: name, mobile: phone, city: city } }, { new: true, acknowledged: true });
            res.json({ status: 'success', user: result });
        }
        catch (error) {
            console.log('error', error);
            res.json({ status: 'failed', message: 'could not update user details', error: error });
        }
    }),
    cancelBooking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        try {
            const bookingId = (_d = req.params) === null || _d === void 0 ? void 0 : _d.id;
            const response = yield userHelper_1.default.cancelBooking(bookingId);
            res.json({ status: 'success', updatedData: response });
        }
        catch (error) {
            console.log('error', error);
            res.json({ status: 'failed', message: 'could not cancel booking', error: error });
        }
    }),
};
exports.default = userController;
