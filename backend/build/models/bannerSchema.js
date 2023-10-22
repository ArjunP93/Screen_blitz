"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    title: { type: String },
    description: { type: String },
    bannerImage: { type: String },
    bannerState: { type: Boolean,
        default: false }
});
const Banner = (0, mongoose_1.model)('Banner', bannerSchema);
exports.default = Banner;
