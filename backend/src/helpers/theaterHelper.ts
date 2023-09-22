import Movie from "../models/movieSchema";
import Screen from "../models/screenSchema";
import Theater from "../models/theaterSchema";
import { ObjectId } from "mongodb";

const theaterHelper = {
    blockedStatusTheater:async(objId:String)=>{
        try {
            const response  = await Theater.findOne({_id:objId})
            return response?.blockedstatus
            
        } catch (error) {
            console.log('cannot fetch theater details')
        }

    },
    theatersForMovie:async(loc:String,movie:string)=>{
        try {
            
            const movieobj = await Movie.findOne({_id:new ObjectId(movie)})

            const response = await Theater.aggregate(
              [
                {
                  $match:
                    
                    {
                      location: loc,
                    },
                },
                {
                  $lookup:
                   
                    {
                      from: "screens",
                      localField: "_id",
                      foreignField: "theaterId",
                      as: "screen",
                    },
                },
                {
                  $unwind:
                  
                    {
                      path: "$screen",
                      includeArrayIndex: "string",
                    },
                },
                {
                  $match:
                    
                    {
                      "screen.movieId":new ObjectId(movie),
                    },
                },
                {
                  $project:
                   
                    {
                      email: false,
                      password: false,
                      mobile: false,
                      __v: false,
                      string: false,
                      screen: {
                        theaterId: false,
                        theaterName: false,
                        __v: false,
                      },
                    },
                },
                {
                  $group:
                   
                    {
                      _id: "$_id",
                      blockedstatus: {
                        $first: "$blockedstatus",
                      },
                      approvalStatus: {
                        $first: "$approvalStatus",
                      },
                      theaterName: {
                        $first: "$theaterName",
                      },
                      location: {
                        $first: "$location",
                      },
                      screen: {
                        $push: "$screen",
                      },
                    },
                },
              ]
            )
                

            
            // console.log('response agggregatoion',response)
            return {movie:movieobj,responseData:response}
        } catch (error) {
            console.log("error in aggregation",error)
        }
    }

    
}
export default theaterHelper