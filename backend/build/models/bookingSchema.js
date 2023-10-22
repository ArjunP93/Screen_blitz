"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    ticketRate: {
        type: Number,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
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
    showTime: { type: String },
    bookedDate: {
        type: Date,
    },
    paymentId: {
        type: String,
    },
    paymentStatus: {},
    movieName: {
        type: String,
    },
    bookingStatus: { type: String, default: 'confirmed' },
    theaterId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Theater'
    },
    screenName: {
        type: String,
    },
    screenId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Screen'
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
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Movie'
    },
    checkin: {
        type: Boolean,
        default: false,
    },
    qrCode: {
        type: String,
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;
