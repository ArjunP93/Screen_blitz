import User from "../models/userSchema";
import Booking from "../models/bookingSchema";
import mongoose from "mongoose";
import { sendEmailService } from "../emailService/emailservice";
import { log } from "console";

interface bookingdata {
    _id:string,
    movieId: string,
    showDate: string,
    selectedTheater: string,
    theaterId:string,
    selectedScreen: string,
    selectedShow: string,
    screenId: string,
    screenRows: number,
    screenCols: number,
    movieName: string,
    ticketPrice: number,
    selectedSeats: [],
    ticketCount: number,
    paymentId: string,
    paymentStatus: string,
    userId:string,
    totalTicketAmount: number,
    userMailId: string

}
interface findbooked{
    date:string,
    show:string,
    theater:string,
    screen:string,
    movie:string

}

const userHelper = {
    blockedStatusUser:async(objId:String)=>{
        try {
            const response  = await User.findOne({_id:objId})
            return response?.blockedStatus
            
        } catch (error) {
         console.log('canot fetch userdata')   
        }

    },
    findBookedSeats:async(obj:findbooked)=>{
        try {
            console.log('vles in aggregation',obj)
            const result = await Booking.aggregate([
                {
                  $match: {
                    showDate:obj.date,
                    showTime:obj.show,
                    screenId:new mongoose.Types.ObjectId(obj.screen), 
                    theaterName:obj.theater,
                    movieId:new mongoose.Types.ObjectId(obj.movie) 
                  }
                }
              ]);
              
            const bookedSeatsArray = result.map((obj)=>obj.bookedSeats).flat()
            return bookedSeatsArray
            
        } catch (error) {
         console.log('canot fetch booked seats data in  aggregation',error)   
        }

    },
    createBooking:async(data:bookingdata)=>{
        try {
            const dataExists= await Booking.findOne({paymentId:data.paymentId})
            console.log('dataaaa dataExists',dataExists)
            if(dataExists){
                return false

            }
            else{
                const bookObj=new Booking({
                    _id:data._id,
                    userId:data.userId,
                    email:data.userMailId,
                    showDate:data.showDate,
                    showTime:data.selectedShow,

                    paymentId:data.paymentId,
                    paymentStatus:data.paymentStatus,
                    movieName:data.movieName,
                    screenName:data.selectedScreen,
                    screenId: new mongoose.Types.ObjectId(data.screenId) ,
                    theaterName:data.selectedTheater,
                    theaterId:new mongoose.Types.ObjectId(data.theaterId),
                    bookedSeats:data.selectedSeats,
                    totalAmount:data.totalTicketAmount,
                    ticketCount:data.ticketCount,
                    movieId:data.movieId,
                })
               const response =  await bookObj.save()
               

               sendEmailService().sendEmail(data.userMailId,'booking confirmation',data._id.toString())


               return response
            }
        

        } catch (error) {
            console.log('error creating booking',error)
        }
    }
}
export default userHelper