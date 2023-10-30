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
const theaterSchema_1 = __importDefault(require("../models/theaterSchema"));
const movieSchema_1 = __importDefault(require("../models/movieSchema"));
const locationSchema_1 = __importDefault(require("../models/locationSchema"));
const bannerSchema_1 = __importDefault(require("../models/bannerSchema"));
const adminHelper_1 = __importDefault(require("../helpers/adminHelper"));
const adminController = {
    userFetch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usersData = yield userSchema_1.default.find();
            console.log("db respomse data", usersData);
            res.json({ usersDetails: usersData });
        }
        catch (error) {
            res.json({ message: "couldn't fetch userdetails", error });
            //this is  error
        }
    }),
    theaterFetch: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const theatersData = yield theaterSchema_1.default.find();
            console.log("db respomse data", theatersData);
            res.json({ theatersDetails: theatersData });
        }
        catch (error) {
            res.json({ message: "couldn't fetch theaterdetails", error });
        }
    }),
    getAllMovies: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const moviesList = yield movieSchema_1.default.find().sort({ releaseDate: -1 });
            res.json({ movieData: moviesList, status: "success" });
        }
        catch (error) {
            res.json({ message: "could not fetch movies", status: "failed", error });
        }
    }),
    addLocations: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newLocation = req.body.location;
            const locationExist = yield locationSchema_1.default.findOne({ location: newLocation });
            if (locationExist) {
                res.json({ message: "already exist", status: "failed" });
            }
            else {
                const newObjLoc = new locationSchema_1.default({
                    location: newLocation,
                });
                const response = yield newObjLoc.save();
                res.json({
                    message: "location addded",
                    status: "success",
                    location: response,
                });
            }
        }
        catch (error) {
            res.json({
                message: "could not add location",
                status: "error",
                error: error,
            });
        }
    }),
    availableLocations: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const responselist = yield locationSchema_1.default.find();
            res.json({ status: "success", locations: responselist });
        }
        catch (error) {
            res.json({
                message: "could not get locationlist",
                status: "error",
                error: error,
            });
        }
    }),
    addBanners: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            console.log("bodyyy", req.body);
            const { title, description } = req.body;
            const image = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path;
            const bannerExist = yield bannerSchema_1.default.findOne({ title: title });
            if (bannerExist) {
                res.json({ status: "failed", message: "banner already exists" });
            }
            else {
                const bannerObj = new bannerSchema_1.default({
                    title: title,
                    description: description,
                    bannerImage: image,
                });
                const response = yield bannerObj.save();
                res.json({ status: "success", message: "banner added successfully" });
            }
        }
        catch (error) {
            res.json({
                message: "could not add banners",
                status: "error",
                error: error,
            });
        }
    }),
    bannerList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bannerResults = yield bannerSchema_1.default.find({});
            res.json({ bannerDetails: bannerResults, status: 'success' });
        }
        catch (error) {
            console.log("error in list banner", error);
            res.json({ status: "error", error: error });
        }
    }),
    activateBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bannerState = req.body;
            console.log("bannerState", bannerState);
            yield bannerSchema_1.default.updateOne({ _id: bannerState.id }, { $set: { bannerState: bannerState.state } }).then(() => {
                res.json({ bannerState: bannerState.state });
            });
        }
        catch (error) {
            res.json({ message: "couldn't Activate or deactivate banner", error });
        }
    }),
    deleteBanner: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bannerId = req.params.id;
            const response = yield bannerSchema_1.default.deleteOne({ _id: bannerId });
            res.json({ status: "success", message: "banner deleted successfully" });
        }
        catch (error) {
            console.log("error in delete banner", error);
            res.json({ status: "error", error: error });
        }
    }),
    deleteLocation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const locId = req.params.id;
            yield locationSchema_1.default.deleteOne({ _id: locId });
            res.json({ status: "success", message: "delete success" });
        }
        catch (error) {
            res.json({
                message: "could not remove location",
                status: "error",
                error: error,
            });
        }
    }),
    theaterApprove: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("backend therrerapprove");
        try {
            const approvalState = req.body;
            console.log("approvalState", approvalState);
            yield theaterSchema_1.default.updateOne({ _id: approvalState.id }, { $set: { approvalStatus: approvalState.state } }).then(() => {
                res.json({ approvalState: approvalState.state });
            });
        }
        catch (error) {
            res.json({ message: "couldn't Approve theater", error });
        }
    }),
    theaterBlockUnblock: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blockStatus = req.body;
            yield theaterSchema_1.default.updateOne({ _id: blockStatus.id }, { $set: { blockedstatus: blockStatus.state } }).then(() => {
                if (blockStatus.state) {
                    res.json({ block: blockStatus.state, message: "blocked" });
                }
                else {
                    res.json({ block: blockStatus.state, message: "unblocked" });
                }
            });
        }
        catch (error) {
            res.json({ message: "cannot update blocked status of theater" });
        }
    }),
    userApprove: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userApprovalState = req.body;
            yield userSchema_1.default.updateOne({ _id: userApprovalState.id }, { $set: { blockedStatus: userApprovalState.state } }).then(() => {
                res.json({ approvalState: userApprovalState.state });
            });
        }
        catch (error) {
            res.json({ message: "couldn't Approve user", error });
        }
    }),
    getAdminChartData: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chartDataResult = yield adminHelper_1.default.adminChartData();
            const dashInfo = yield adminHelper_1.default.adminDashInfo();
            res.json({ status: "success", dashInfo: dashInfo, chartData: chartDataResult });
        }
        catch (error) {
            console.log('error', error);
            res.json({ status: 'failed', message: 'could get  admin dash  details', error: error });
        }
    }),
};
exports.default = adminController;
