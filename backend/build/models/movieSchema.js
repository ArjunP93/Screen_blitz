"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
    movieName: {
        type: String
    },
    language: {
        type: String
    },
    directorName: {
        type: String
    },
    leadCast: {
        type: String
    },
    genere: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    poster: {
        type: String
    },
    backgroundPoster: {
        type: String
    },
    duration: {
        type: String
    },
    overview: {
        type: String
    },
    movieId: {
        type: Number
    },
    theaterIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Theater' }], // An array of ObjectIds referencing 'Theater' model
}, {
    timestamps: true,
    // toJSON:{
    //     transform(doc,ret){
    //         ret.id = ret._id
    //         delete ret._id
    //         delete ret.__v
    //     }
    // }
});
// movieSchema.pre('save',()=>{
// })
const Movie = (0, mongoose_1.model)('Movie', movieSchema);
exports.default = Movie;
