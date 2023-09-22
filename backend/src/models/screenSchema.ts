import { Schema,model } from "mongoose";


const screenSchema = new Schema({

    screenName:{
        type:String,

    },
    rows:{type:Number},
    columns:{type:Number},
    language:{type:String},
    shows:{type:Array},
    movieId:{ type: Schema.Types.ObjectId, ref: 'Movie' }, 
    movieName:{type:String},
    theaterId:{ type: Schema.Types.ObjectId, ref: 'Theater' },
    theaterName:{type:String}




})
const Screen = model("Screen",screenSchema)

export default Screen