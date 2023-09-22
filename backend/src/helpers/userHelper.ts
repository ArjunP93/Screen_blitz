import User from "../models/userSchema";

const userHelper = {
    blockedStatusUser:async(objId:String)=>{
        try {
            const response  = await User.findOne({_id:objId})
            return response?.blockedStatus
            
        } catch (error) {
         console.log('canot fetch userdata')   
        }

    }
}
export default userHelper