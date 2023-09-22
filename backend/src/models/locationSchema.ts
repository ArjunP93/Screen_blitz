
import { Schema,model } from "mongoose";


const locationSchema = new Schema({
    location:{type:String}

},{
    timestamps:true,
   
})



const Location = model('Location',locationSchema)
export default Location