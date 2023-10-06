import Movie from "../models/movieSchema";

const movieHelper = {
  searchForMovie: async (searchKey: string) => {
    try {
      const regexPattern = new RegExp(searchKey, "i");
      const response = await Movie.find({
        movieName: { $regex: regexPattern },
      });
      return response;
    } catch (error) {
      console.log("error fetching from movies db", error);
    }
  },
  searchMovieById: async (id: string) => {
    try {
      const result = await Movie.findOne({ _id: id });
      return result;
    } catch (error) {
      console.log("error fetching movie from db", error);
    }
  },
};

export default movieHelper;
