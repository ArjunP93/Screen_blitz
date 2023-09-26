import { Schema,model } from "mongoose";


const bookingSchema = new Schema({
    ticketRate: {
        type: Number,
    
      },
      userId: {
     type: Schema.Types.ObjectId, ref: 'User'
    
      },
      Email: {
        type: String,
    
      },
      userName: {
        type: String,
    
      },
      showDate: {
        type: String,
    
      },
      bookedDate: {
        type: Date,
    
      },
      paymentId: {
        type: String,
    
      },
      movieName: {
        type: String,
    
        
      },
      theaterId: {
        type: Schema.Types.ObjectId, ref: 'Theater'     
      },
      screenName: {
        type: String,
    
      },
      startAt: {
        type: String,
        trim: true,
      },
      bookedseats: {
        type: [{}],
    
      },
      theaterName: {
        type: String,
    
      },
      totalAmount: {
        type: Number,
    
      },
      ticketCount: {
        type: Number,
    
      },
      movieId: {
        type: Schema.Types.ObjectId, ref: 'Movie'     
      
    
      },
      checkin: {
        type: Boolean,
        default: false,
      },
      qrCode: {
        type: String,
       
      },
    }


,{
    timestamps:true,
   
})

const Booking  = model('Booking',bookingSchema)
export default Booking