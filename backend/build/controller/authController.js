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
const adminSchema_1 = __importDefault(require("../models/adminSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JwtAuth_1 = require("../authService/JwtAuth");
const userWalletSchema_1 = __importDefault(require("../models/userWalletSchema"));
const adminCredentials = {
    username: "admin",
    password: "admin123",
};
const authController = {
    findUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userinfo = req.params.id;
            const mobile = parseInt(userinfo);
            const userData = yield userSchema_1.default.findOne({ mobile: mobile });
            if (userData) {
                res.json({ status: true, user: userData });
            }
            else {
                res.json({ status: false, message: 'user not found' });
            }
        }
        catch (error) {
            console.log('error at auth controller finduser', error);
            res.json({ status: false, message: 'invalid user' });
        }
    }),
    userOtpLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.body.id;
            //find user in db
            const userFile = yield userSchema_1.default.findOne({ _id: userId });
            if (userFile) {
                if (userFile.blockedStatus) {
                    return res.json({
                        userBlocked: true,
                        message: "OOPS!! you are blocked by admin",
                    });
                }
                else {
                    //generate jwt and send to client
                    const user_id = userFile._id.toString();
                    const jwt = (0, JwtAuth_1.generateJWT)(user_id, "user");
                    res.json({
                        user: userFile,
                        created: true,
                        token: jwt,
                        status: "success",
                    });
                }
            }
        }
        catch (error) {
            res.json({ error, loginStatus: false, message: "login failed" });
        }
    }),
    userLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            //find user in db
            const userFile = yield userSchema_1.default.findOne({ email });
            if (userFile) {
                if (userFile.password) {
                    bcrypt_1.default.compare(password, userFile.password, function (err, result) {
                        if (result === true) {
                            if (userFile.blockedStatus) {
                                return res.json({
                                    userBlocked: true,
                                    message: "OOPS!! you are blocked by admin",
                                });
                            }
                            else {
                                //generate jwt and send to client
                                const user_id = userFile._id.toString();
                                const jwt = (0, JwtAuth_1.generateJWT)(user_id, "user");
                                res.json({
                                    user: userFile,
                                    created: true,
                                    token: jwt,
                                    status: "success",
                                });
                            }
                        }
                        else {
                            return (res
                                // .status(401)
                                .json({ login_status: false, message: "invalid credentials" }));
                        }
                    });
                }
                else {
                    return res.json({
                        login_status: false,
                        message: "invalid username or password",
                    });
                }
            }
        }
        catch (error) {
            res.json({ error, loginStatus: false, message: "login failed" });
        }
    }),
    UserSignup: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, name, password, } = req.body;
            const mobile = parseInt(req.body.mobile);
            let hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // check for existing user
            const existingUser = yield userSchema_1.default.findOne({ email: email });
            if (existingUser) {
                return res.json({ userExist: true, message: "User already exists" });
            }
            // Creating a new user
            const newUserData = new userSchema_1.default({
                email,
                name,
                password: hashedPassword,
                mobile: mobile
            });
            const returnData = yield newUserData.save();
            const newUserId = returnData._id;
            const jwt = (0, JwtAuth_1.generateJWT)(newUserId.toString(), "user");
            // create empty wallet for new user
            const newUserWallet = new userWalletSchema_1.default({
                userId: newUserId,
                balance: 0,
                transactions: []
            });
            yield newUserWallet.save();
            res.json({
                user: newUserData,
                created: true,
                token: jwt,
                status: "success",
            });
        }
        catch (error) {
            res.json({ error, created: false });
        }
    }),
    TheaterLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            //find user in db
            const theaterFile = yield theaterSchema_1.default.findOne({ email });
            if (theaterFile) {
                bcrypt_1.default.compare(password, theaterFile.password, function (err, result) {
                    if (result === true) {
                        if (theaterFile.blockedstatus) {
                            return res.json({
                                userBlocked: true,
                                message: "OOPS!! you are blocked by admin",
                            });
                        }
                        else {
                            //generate jwt and send to client
                            const theater_id = theaterFile._id.toString();
                            const jwt = (0, JwtAuth_1.generateJWT)(theater_id, "theater");
                            res.json({
                                theater: theaterFile,
                                created: true,
                                token: jwt,
                                status: "success",
                            });
                        }
                    }
                    else {
                        return (res
                            // .status(401)
                            .json({ login_status: false, message: "invalid credentials" }));
                    }
                });
            }
            else {
                return res.json({
                    login_status: false,
                    message: "invalid username or password",
                });
            }
        }
        catch (error) {
            res.json({ error, loginStatus: false, message: "login failed" });
        }
    }),
    TheaterSignUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, name, password, mobile, } = req.body;
            let hashedPassword = yield bcrypt_1.default.hash(password, 10);
            // check for existing theater
            const existingTheater = yield theaterSchema_1.default.findOne({ email: email });
            if (existingTheater) {
                return res.json({ userExist: true, message: "Theater already exists" });
            }
            // Creating a new theaterprofile
            const newTheaterData = new theaterSchema_1.default({
                email,
                theaterName: name,
                password: hashedPassword,
                mobile,
            });
            const returnTheaterData = yield newTheaterData.save();
            const newTheaterId = returnTheaterData._id.toString();
            const jwt = (0, JwtAuth_1.generateJWT)(newTheaterId, "theater");
            res.json({
                user: newTheaterData,
                created: true,
                token: jwt,
                status: "success",
            });
        }
        catch (error) {
            res.json({ error, created: false });
        }
    }),
    adminLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            //find user in db
            const adminFile = yield adminSchema_1.default.findOne({ email });
            if (adminFile) {
                bcrypt_1.default.compare(password, adminFile.password, function (err, result) {
                    if (result === true) {
                        //generate jwt and send to client
                        const admin_id = adminFile._id.toString();
                        const jwt = (0, JwtAuth_1.generateJWT)(admin_id, "admin");
                        res.json({
                            admin: adminFile,
                            created: true,
                            token: jwt,
                            status: "success",
                        });
                    }
                    else {
                        return (res
                            // .status(401)
                            .json({
                            login_status: false,
                            message: "invalid admin credentials",
                        }));
                    }
                });
            }
            else {
                return res.json({
                    login_status: false,
                    message: "invalid admin username or password",
                });
            }
        }
        catch (error) {
            res.json({ error, loginStatus: false, message: "login failed" });
        }
    }),
    userGoogleAuth: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("data fron frrooont", req.body);
        try {
            const { name, email } = req.body;
            //find user in db
            const userFile = yield userSchema_1.default.findOne({ email });
            if (userFile) {
                if (userFile.blockedStatus) {
                    return res.json({
                        userBlocked: true,
                        message: "OOPS!! you are blocked by admin",
                    });
                }
                else {
                    //generate jwt and send to client
                    const user_id = userFile._id.toString();
                    const jwt = (0, JwtAuth_1.generateJWT)(user_id, "user");
                    res.json({
                        user: userFile,
                        created: true,
                        token: jwt,
                        status: "success",
                    });
                }
            }
            else {
                // Creating a new user
                const newUserData = new userSchema_1.default({
                    email,
                    name,
                });
                const returnData = yield newUserData.save();
                const newUserId = returnData._id;
                const jwt = (0, JwtAuth_1.generateJWT)(newUserId.toString(), "user");
                // create empty wallet for new user
                const newUserWallet = new userWalletSchema_1.default({
                    userId: newUserId,
                    balance: 0,
                    transactions: []
                });
                yield newUserWallet.save();
                res.json({
                    user: newUserData,
                    created: true,
                    token: jwt,
                    status: "success",
                });
            }
        }
        catch (error) {
            res.json({ error, loginStatus: false, message: "login failed" });
        }
    }),
};
exports.default = authController;
