"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const guestController_1 = __importDefault(require("../controller/guestController"));
const guestRouter = express_1.default.Router();
guestRouter.get('/movielist', guestController_1.default.guestGetAllMovies);
guestRouter.post('/searchmovie', guestController_1.default.searchMovie);
exports.default = guestRouter;
