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
        try {
            const theatersData = await Theater.find()
            console.log('db respomse data',theatersData)

            res.json({theatersDetails:theatersData})
            
        } catch (error) {
            res.json({message:"couldn't fetch theaterdetails",error})
        }
    },

    theaterApprove:async(req:Request,res:Response)=>{
        console.log('backend therrerapprove')
        try {
            const approvalState = req.body
            console.log('approvalState',approvalState)

            await Theater.updateOne({_id:approvalState.id},{$set:{approvalStatus:approvalState.state}}).then(()=>{
                            res.json({approvalState:approvalState.state})

            })

            
        } catch (error) {
            res.json({message:"couldn't Approve theater",error})
        }
    },

    userApprove:async(req:Request,res:Response)=>{
        console.log('backend usrtapprove')
        try {
            const userApprovalState = req.body
            console.log('approvalState',userApprovalState)

            await User.updateOne({_id:userApprovalState.id},{$set:{blockedStatus:userApprovalState.state}}).then(()=>{
                            res.json({approvalState:userApprovalState.state})

            })

            
        } catch (error) {
            res.json({message:"couldn't Approve user",error})
        }
    }


}

export default adminController