"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
const express_1 = __importDefault(require("express"));
const expressConfig_1 = __importDefault(require("./config/expressConfig"));
const http_1 = __importDefault(require("http"));
const databaseConfig_1 = __importDefault(require("./config/databaseConfig"));
const server_1 = __importDefault(require("./config/server"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const theaterRoute_1 = __importDefault(require("./routes/theaterRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const cloudinary_1 = require("cloudinary");
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const accessCheckMiddelware_1 = __importDefault(require("./middlewares/accessCheckMiddelware"));
const guestRoute_1 = __importDefault(require("./routes/guestRoute"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//mongodb connection 
(0, databaseConfig_1.default)();
// console.log('process.env.CLOUDINARY_CLOUD_NAME',process.env.CLOUDINARY_CLOUD_NAME)
// console.log('proces',process.env.CLOUDINARY_API_KEY)
// console.log('1111',process.env.CLOUDINARY_API_SECRET)
//cloudinary 
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })
cloudinary_1.v2.config({
    cloud_name: 'arjun-cloud-storage',
    api_key: '356783219286312',
    api_secret: 'hN92sGprnV_R0d9ho6jkHMOTves'
});
//middleware express config 
(0, expressConfig_1.default)(app);
//routes
app.use('/api/auth', authRoute_1.default);
app.use('/api/admin', (0, authMiddleware_1.default)('admin'), adminRoute_1.default);
app.use('/api/theater', (0, authMiddleware_1.default)('theater'), accessCheckMiddelware_1.default.theaterBlockCheck, theaterRoute_1.default);
app.use('/api/user', (0, authMiddleware_1.default)('user'), accessCheckMiddelware_1.default.userBlockCheck, userRoute_1.default);
app.use('/api/guest', guestRoute_1.default);
//start the server
(0, server_1.default)(server);
