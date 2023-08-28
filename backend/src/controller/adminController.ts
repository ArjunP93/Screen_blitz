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

    },

    theaterFetch:async(req:Request,res:Response)=>{
        console.log('backend therrerfetch')
        try {
            const theatersData = await Theater.find()
            console.log('db respomse data',theatersData)

            res.json({theatersDetails:theatersData})
            
        } catch (error) {
            res.json({message:"couldn't fetch theaterdetails",error})
        }
    }


}

export default adminController