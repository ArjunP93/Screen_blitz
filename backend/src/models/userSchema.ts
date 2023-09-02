import {Schema,model} from 'mongoose'





const userSchema = new Schema (
    {
        name:{
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
            minlength:6
        },
        profilePic:{
            type:Array
        },
        blockedStatus:{
            type:Boolean,
            default:false
        },
        mobile:{
            type:Number
        }

    }

)
const User = model('User',userSchema)

export default User