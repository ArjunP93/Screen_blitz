"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBanner = exports.uploadTheaterPics = exports.uploadUserPics = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = require("cloudinary");
// const moviePosters = {
//     cloudinary:cloudinary,
//     params:{
//         folder: 'Movie-Posters',
//         allowed_formats : ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
//         // transformation: [{ width: 500, height: 500, crop: 'limit' }] ,
//         public_id: (req:any,file:any) => {
//             const originalname = file.originalname.split('.')
//             return `image-${Date.now()}-${originalname[0]}`
//         }
//     }
// }
const userProfilePic = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'SB-User-Pics',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
        public_id: (req, file) => {
            console.log('cloudinary  filee', file, req.body);
            const originalname = file.originalname.split('.');
            return `image-${Date.now()}-${originalname[0]}`;
        }
    }
};
const theaterProfilePic = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'SB-Theater-Pics',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
        public_id: (req, file) => {
            console.log('cloudinary  filee', file, req.body);
            const originalname = file.originalname.split('.');
            return `image-${Date.now()}-${originalname[0]}`;
        }
    }
};
const bannerPic = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'SB-banner-Pics',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
        public_id: (req, file) => {
            console.log('cloudinary  filee', file, req.body);
            const originalname = file.originalname.split('.');
            return `image-${Date.now()}-${originalname[0]}`;
        }
    }
};
const bannerStorage = new multer_storage_cloudinary_1.CloudinaryStorage(bannerPic);
const uploadBanner = (0, multer_1.default)({ storage: bannerStorage }).single('banner');
exports.uploadBanner = uploadBanner;
const userProPicStorage = new multer_storage_cloudinary_1.CloudinaryStorage(userProfilePic);
const uploadUserPics = (0, multer_1.default)({ storage: userProPicStorage }).single('userProfileImage');
exports.uploadUserPics = uploadUserPics;
const theaterProPicStorage = new multer_storage_cloudinary_1.CloudinaryStorage(theaterProfilePic);
const uploadTheaterPics = (0, multer_1.default)({ storage: theaterProPicStorage }).single('theaterProfileImage');
exports.uploadTheaterPics = uploadTheaterPics;
// const moviePostersStorage = new CloudinaryStorage(moviePosters)
// const uploadMoviePoster = multer({storage:moviePostersStorage }).single('poster1')
