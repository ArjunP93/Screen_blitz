"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controller/authController"));
const authRoute = express_1.default.Router();
authRoute.post('/login', authController_1.default.userLogin);
authRoute.post('/signup', authController_1.default.UserSignup);
authRoute.post('/glogin', authController_1.default.userGoogleAuth);
authRoute.get('/finduser/:id', authController_1.default.findUser);
authRoute.post('/otplogin', authController_1.default.userOtpLogin);
//theater login and signup
authRoute.post('/theater/login', authController_1.default.TheaterLogin);
authRoute.post('/theater/signup', authController_1.default.TheaterSignUp);
//admin login
authRoute.post('/admin/login', authController_1.default.adminLogin);
exports.default = authRoute;
