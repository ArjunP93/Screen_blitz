"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const screenSchema = new mongoose_1.Schema({
    screenName: {
        type: String,
    },
    rows: { type: Number },
    columns: { type: Number },
    language: { type: String },
    shows: { type: Array },
    movieId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Movie' },
    movieName: { type: String },
    theaterId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Theater' },
    theaterName: { type: String },
    ticketRate: { type: Number }
});
const Screen = (0, mongoose_1.model)("Screen", screenSchema);
exports.default = Screen;
