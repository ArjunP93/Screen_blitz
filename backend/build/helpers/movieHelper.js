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
const movieHelper = {
    searchForMovie: (searchKey) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const regexPattern = new RegExp(searchKey, "i");
            const response = yield movieSchema_1.default.find({
                movieName: { $regex: regexPattern },
            });
            return response;
        }
        catch (error) {
            console.log("error fetching from movies db", error);
        }
    }),
    searchMovieById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield movieSchema_1.default.findOne({ _id: id });
            return result;
        }
        catch (error) {
            console.log("error fetching movie from db", error);
        }
    }),
};
exports.default = movieHelper;
