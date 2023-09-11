import multer from 'multer'
import { CloudinaryStorage } from "multer-storage-cloudinary"
import {v2 as cloudinary} from 'cloudinary'


const moviePosters = {
    cloudinary:cloudinary,
    params:{
        folder: 'Movie-Posters',
        allowed_formats : ['jpg', 'jpeg', 'png', 'svg', 'webp', 'gif', 'jfif', 'webp'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }] ,
        public_id: (req:any,file:any) => {
            const originalname = file.originalname.split('.')
            return `image-${Date.now()}-${originalname[0]}`
        }
    }

}


const moviePostersStorage = new CloudinaryStorage(moviePosters)
export const uploadMoviePoster = multer({storage:moviePostersStorage }).single('poster1')
