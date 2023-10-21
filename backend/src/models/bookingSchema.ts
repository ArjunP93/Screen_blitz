import { Schema,model } from "mongoose";


const bookingSchema = new Schema({
    ticketRate: {
        type: Number,
    
      },
      userId: {
     type: Schema.Types.ObjectId, ref: 'User'
    
      },
      email: {
        type: String,
    
      },
      userName: {
        type: String,
    
      },
      showDate: {
        type: String,
    
      },
      showTime:{type:String},

      bookedDate: {
        type: Date,
    
      },
      paymentId: {
        type: String,
    
      },
      paymentStatus:{

      },
      movieName: {
        type: String,
    
        
      },
      bookingStatus:{type:String, default:'confirmed'},
      
      theaterId: {
        type: Schema.Types.ObjectId, ref: 'Theater'     
      },
      screenName: {
        type: String,
    
      },
      screenId: {
        type: Schema.Types.ObjectId, ref: 'Screen'
    
      },
      startAt: {
        type: String,
        trim: true,
      },
      bookedSeats: {
        type: [],
    
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