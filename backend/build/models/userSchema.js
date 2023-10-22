"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
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
        minlength: 6
    },
    profilePic: {
        type: []
    },
    blockedStatus: {
        type: Boolean,
        default: false
    },
    mobile: {
        type: Number
    },
    city: { type: String }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
