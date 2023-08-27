import { Request,Response } from "express"
import User from '../models/userSchema'
import Theater from '../models/theaterSchema'




const adminController ={
    
    userFetch:async(req:Request,res:Response)=>{
        try {
            const usersData  = await User.find()
            console.log('db respomse data',usersData)
            res.json({usersDetails:usersData})

        } catch (error) {
            res.json({message:"couldn't fetch userdetails",error})
            
        }

    }


}

export default adminController