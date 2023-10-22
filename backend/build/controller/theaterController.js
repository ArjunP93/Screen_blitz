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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const theaterSchema_1 = __importDefault(require("../models/theaterSchema"));
const movieSchema_1 = __importDefault(require("../models/movieSchema"));
const screenSchema_1 = __importDefault(require("../models/screenSchema"));
const constants_1 = __importDefault(require("../assets/constants"));
const mongodb_1 = require("mongodb");
const locationSchema_1 = __importDefault(require("../models/locationSchema"));
const theaterHelper_1 = __importDefault(require("../helpers/theaterHelper"));
const theaterController = {
    addMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const movieURLTmdb = `${constants_1.default.tmdbMovieBaseURL}${req.body.poster_path}`;
            const movieBackgroundURLTmdb = `${constants_1.default.tmdbMovieBaseURL}${req.body.backdrop_path}`;
            // console.log('movie data request body',movieData)
            const movieExist = yield movieSchema_1.default.findOne({ movieName: req.body.title });
            if (movieExist) {
                const theaterIdExists = yield movieSchema_1.default.findOne({
                    movieName: req.body.title,
                    theaterIds: { $in: [new mongodb_1.ObjectId(req.body.theaterId)] },
                });
                if (theaterIdExists) {
                    res.json({
                        created: false,
                        status: "failed",
                        message: "movie already exists",
                    });
                }
                else {
                    console.log(" inside else theaterIdExists");
                    const respObj = yield movieSchema_1.default.findOneAndUpdate({ movieName: req.body.title }, { $push: { theaterIds: new mongodb_1.ObjectId(req.body.theaterId) } }, { new: true });
                    res.json({
                        addedMovObj: respObj,
                        message: "movie added successfully",
                        created: true,
                        status: "success",
                    });
                }
            }
            else {
                const movieObj = new movieSchema_1.default({
                    movieName: req.body.title,
                    language: req.body.original_language,
                    movieId: req.body.id,
                    releaseDate: new Date(req.body.release_date),
                    poster: movieURLTmdb,
                    backgroundPoster: movieBackgroundURLTmdb,
                    overview: req.body.overview,
                    theaterNames: req.body.theaterName,
                    theaterIds: new mongodb_1.ObjectId(req.body.theaterId),
                });
                const resObj = yield movieObj.save();
                console.log("movieObj", resObj);
                res.json({
                    addedMovObj: resObj,
                    message: "movie added successfully",
                    created: true,
                    status: "success",
                });
            }
        }
        catch (error) {
            res.json({ message: error, created: false });
        }
    }),
    addScreen: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _a = req.body, { show1, show2, show3, show4, show5, show6 } = _a, rest = __rest(_a, ["show1", "show2", "show3", "show4", "show5", "show6"]);
            const shows = [
                { _id: new mongodb_1.ObjectId(), show1: show1, bookedSeats: [] },
                { _id: new mongodb_1.ObjectId(), show2: show2, bookedSeats: [] },
                { _id: new mongodb_1.ObjectId(), show3: show3, bookedSeats: [] },
                { _id: new mongodb_1.ObjectId(), show4: show4, bookedSeats: [] },
                { _id: new mongodb_1.ObjectId(), show5: show5, bookedSeats: [] },
                { _id: new mongodb_1.ObjectId(), show6: show6, bookedSeats: [] },
            ];
            const reqObj = Object.assign(Object.assign({}, rest), { shows });
            const screenExist = yield screenSchema_1.default.findOne({
                screenName: reqObj.screenName,
                theaterId: reqObj.theaterId,
            });
            if (screenExist) {
                res.json({ message: "screen already exists", created: false });
            }
            else {
                const screenObj = new screenSchema_1.default({
                    theaterName: reqObj.theaterName,
                    theaterId: new mongodb_1.ObjectId(reqObj.theaterId),
                    screenName: reqObj.screenName,
                    rows: reqObj.Rows,
                    columns: reqObj.Columns,
                    shows: reqObj.shows,
                    ticketRate: reqObj.ticketRate,
                });
                const resSaveScreen = yield screenObj.save();
                res.json({
                    addedScreenObj: resSaveScreen,
                    message: "Screen added successfully",
                    created: true,
                    status: "success",
                });
            }
        }
        catch (error) { }
    }),
    getMovies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const searchTheaterId = (_b = req.params) === null || _b === void 0 ? void 0 : _b.id;
            const moviesList = yield movieSchema_1.default.find({
                theaterIds: { $in: [new mongodb_1.ObjectId(searchTheaterId)] },
            }).sort({ releaseDate: -1 });
            res.json({ movieData: moviesList, status: "success" });
        }
        catch (error) {
            res.json({ message: "could not fetch movies", status: "failed", error });
        }
    }),
    getScreens: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const id = (_c = req.params) === null || _c === void 0 ? void 0 : _c.id;
            const screenList = yield screenSchema_1.default.find({ theaterId: new mongodb_1.ObjectId(id) });
            res.json({ screenData: screenList, status: "success" });
        }
        catch (error) {
            res.json({ message: "could not fetch screen", status: "failed", error });
        }
    }),
    deleteMovie: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { moviId, theater } = req.params;
            const screenResult = yield screenSchema_1.default.updateMany({ theaterId: theater, movieId: moviId }, { $set: { movieName: '', movieId: null } });
            const response = yield movieSchema_1.default.deleteOne({ _id: moviId });
            res.json({ status: "success", message: "Movie removed successfully" });
        }
        catch (error) {
            console.log(error);
            res.json({ status: "failed", message: "Could not remove movie", error });
        }
    }),
    deleteScreen: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        try {
            const id = (_d = req.params) === null || _d === void 0 ? void 0 : _d.id;
            const response = yield screenSchema_1.default.deleteOne({ _id: id });
            res.json({ status: "success", message: "Screen removed successfully" });
        }
        catch (error) {
            res.json({ status: "failed", message: "Could not remove Screen", error });
        }
    }),
    allocateScreen: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reqData = req.body;
            if (reqData.movie !== "" && reqData.screen !== "") {
                const movieTitle = yield movieSchema_1.default.findOne({
                    _id: new mongodb_1.ObjectId(reqData.movie),
                });
                console.log("movieTitle", movieTitle);
                const response = yield screenSchema_1.default.updateOne({ _id: new mongodb_1.ObjectId(reqData.screen) }, {
                    $set: {
                        movieId: new mongodb_1.ObjectId(reqData.movie),
                        movieName: movieTitle === null || movieTitle === void 0 ? void 0 : movieTitle.movieName,
                    },
                });
                console.log("response", response);
                res.json({ status: "success", message: "movie allocated in screen" });
            }
            else {
                res.json({
                    status: "failed",
                    message: "Could not allocate empty movie and Screen",
                });
            }
        }
        catch (error) {
            res.json({
                status: "failed",
                message: "Could not allocate movie in  Screen",
                error,
            });
        }
    }),
    addProfilePic: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        try {
            const { theater } = req.body;
            console.log('form body', req.body);
            console.log('file url', req.file);
            const imageURL = (_e = req.file) === null || _e === void 0 ? void 0 : _e.path;
            console.log('imageURL', imageURL);
            const updateResponse = yield theaterSchema_1.default.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(theater) }, { $set: { profilePic: imageURL } }, { new: true, acknowledged: true } // Set acknowledged to true
            );
            res.json({ status: 'success', theater: updateResponse });
        }
        catch (error) {
            console.log('error', error);
            res.json({ status: 'failed', message: 'could not get theater result', error: error });
        }
    }),
    getTheaterProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f;
        try {
            const id = (_f = req.params) === null || _f === void 0 ? void 0 : _f.id;
            const profile = yield theaterSchema_1.default.findOne({ _id: new mongodb_1.ObjectId(id) });
            const locations = yield locationSchema_1.default.find({});
            const screens = yield screenSchema_1.default.countDocuments({ theaterId: new mongodb_1.ObjectId(id) });
            const result = Object.assign(Object.assign({}, profile), { screens: screens });
            res.json({ theater: result, status: "success", locations: locations });
        }
        catch (error) {
            res.json({ message: "could not get theater profile", status: "failed", error });
        }
    }),
    editTheaterProfileInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, name, location, mobile, description } = req.body;
            const phone = parseInt(mobile);
            console.log('mobile', mobile);
            console.log('req.body', req.body);
            const screens = yield screenSchema_1.default.countDocuments({ theaterId: new mongodb_1.ObjectId(id) });
            const result = yield theaterSchema_1.default.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: { theaterName: name, mobile: phone, location: location, description: description } }, { new: true, acknowledged: true });
            res.json({ status: 'success', theater: result, screens: screens });
        }
        catch (error) {
            console.log('error', error);
            res.json({ status: 'failed', message: 'could not update theater details', error: error });
        }
    }),
    getChartData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const theater = req.params.id;
            const chartDataResult = yield theaterHelper_1.default.chartData(theater);
            const dashInfo = yield theaterHelper_1.default.dashInfo(theater);
            res.json({ status: "success", dashInfo: dashInfo, chartData: chartDataResult });
        }
        catch (error) {
            console.log('error', error);
            res.json({ status: 'failed', message: 'could get  theater dash  details', error: error });
        }
    }),
};
exports.default = theaterController;
