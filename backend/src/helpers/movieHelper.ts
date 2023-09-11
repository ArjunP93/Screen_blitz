import Movie from "../models/movieSchema";


const movieHelper = {
    searchForMovie:async(searchKey:string)=>{
        try {
            const regexPattern = new RegExp(searchKey, "i");
        const response = await Movie.find({
            movieName: { $regex: regexPattern },
          });
          return response

        } catch (error) {
            console.log("error fetching from movies db")
        }
        
    }

}

export default movieHelper