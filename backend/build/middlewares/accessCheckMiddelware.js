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
const JwtAuth_1 = require("../authService/JwtAuth");
const userHelper_1 = __importDefault(require("../helpers/userHelper"));
const theaterHelper_1 = __importDefault(require("../helpers/theaterHelper"));
const accessCheckMiddelware = {
    userBlockCheck: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token = null;
            if (req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            }
            const response = (0, JwtAuth_1.verifyJWT)(token);
            const id = response === null || response === void 0 ? void 0 : response.unique_id;
            //check for blocked status
            const userStatus = yield userHelper_1.default.blockedStatusUser(id);
            if (response && !userStatus) {
                next();
            }
            else {
                res.json({ isBlocked: true, message: "access denied!! you are blocked by admin", status: 'blocked' });
            }
            //   }
        }
        catch (error) {
            res.status(401).json({ message: "Unauthorised Access" });
        }
    }),
    theaterBlockCheck: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token = null;
            if (req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            }
            const response = (0, JwtAuth_1.verifyJWT)(token);
            const id = response === null || response === void 0 ? void 0 : response.unique_id;
            //check for blocked status
            const theaterStatus = yield theaterHelper_1.default.blockedStatusTheater(id);
            console.log('tesrt  theater', theaterStatus);
            if (response && !theaterStatus) {
                next();
            }
            else {
                console.log('tesrt blocked true theater');
                res.json({ isBlocked: true, message: "access denied!! you are blocked by admin", status: 'blocked' });
            }
            //   }
        }
        catch (error) {
            res.status(401).json({ message: "Unauthorised Access " });
        }
    })
};
exports.default = accessCheckMiddelware;
