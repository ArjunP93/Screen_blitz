import multer from 'multer'
import { CloudinaryStorage } from "multer-storage-cloudinary"
import {v2 as cloudinary} from 'cloudinary'

    

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
        cloudinary: cloudinary,
        params: {
            folder: 'SB-User-Pics',
            allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
            public_id: (req: any, file: any) => {
                console.log('cloudinary  filee', file, req.body);
                const originalname = file.originalname.split('.');
                return `image-${Date.now()}-${originalname[0]}`;
            }
        }
    }


    const theaterProfilePic = {
        cloudinary: cloudinary,
        params: {
            folder: 'SB-Theater-Pics',
            allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
            public_id: (req: any, file: any) => {
                console.log('cloudinary  filee', file, req.body);
                const originalname = file.originalname.split('.');
                return `image-${Date.now()}-${originalname[0]}`;
            }
        }
    }


    const userProPicStorage = new CloudinaryStorage(userProfilePic);
   const uploadUserPics = multer({ storage: userProPicStorage }).single('userProfileImage');
    const theaterProPicStorage = new CloudinaryStorage(userProfilePic);
   const uploadTheaterPics = multer({ storage: theaterProPicStorage }).single('userProfileImage');



export { uploadUserPics };
















// const moviePostersStorage = new CloudinaryStorage(moviePosters)
// const uploadMoviePoster = multer({storage:moviePostersStorage }).single('poster1')












