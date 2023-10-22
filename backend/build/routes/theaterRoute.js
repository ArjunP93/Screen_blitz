"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const theaterController_1 = __importDefault(require("../controller/theaterController"));
const multer_1 = require("../multer/multer");
// import {uploadMoviePoster} from '../multer/multer'
const theaterRouter = express_1.default.Router();
theaterRouter.post('/addmovie', theaterController_1.default.addMovie);
theaterRouter.get('/movieslist/:id', theaterController_1.default.getMovies);
theaterRouter.get('/screenlist/:id', theaterController_1.default.getScreens);
theaterRouter.delete('/deletemovie/:movieId/:theater', theaterController_1.default.deleteMovie);
theaterRouter.delete('/deletescreen/:id', theaterController_1.default.deleteScreen);
theaterRouter.post('/addscreen', theaterController_1.default.addScreen);
theaterRouter.post('/movieallocate', theaterController_1.default.allocateScreen);
theaterRouter.post('/addprofilepic', multer_1.uploadTheaterPics, theaterController_1.default.addProfilePic);
theaterRouter.get('/getprofile/:id', theaterController_1.default.getTheaterProfile);
theaterRouter.post('/edittheaterprofile', theaterController_1.default.editTheaterProfileInfo);
theaterRouter.get('/getchart/:id', theaterController_1.default.getChartData);
exports.default = theaterRouter;
