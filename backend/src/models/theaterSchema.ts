import {Schema,model} from 'mongoose'





const theaterSchema = new Schema (
    {
        theaterName:{
            type:String,
            required:true
        },
    
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        location:{
            type:String
        },
        blockedstatus:{
            type:Boolean,
            default:false
        },
        mobile:{
            type:Number,
            required:true
        },
        approvalStatus:{
            type:Boolean,
            default:false
        },
        screens:{
            type:Number
        },
        description:{
            type:String
        },
        profilePic:{
            type:String
        }


    }

)
const Theater = model('Theater',theaterSchema)

export default Theater