"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const theaterSchema = new mongoose_1.Schema({
    theaterName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    location: {
        type: String
    },
    blockedstatus: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: Number,
        required: true
    },
    approvalStatus: {
        type: Boolean,
        default: false
    },
    screens: {
        type: Number
    },
    description: {
        type: String
    },
    profilePic: {
        type: String
    }
});
const Theater = (0, mongoose_1.model)('Theater', theaterSchema);
exports.default = Theater;
