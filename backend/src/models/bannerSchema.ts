import {Schema,model} from  'mongoose'



const bannerSchema = new Schema ({
    title:{type:String}, 
    description:{type:String},
    bannerImage:{type:String},
    bannerState:{type:Boolean,
    default:false}

})


const Banner = model('Banner',bannerSchema)
export default Banner
