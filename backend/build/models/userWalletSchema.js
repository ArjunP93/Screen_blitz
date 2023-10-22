"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userWalletSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    transactions: {
        type: [Object],
        default: [],
    },
});
const Wallet = (0, mongoose_1.model)('Wallet', userWalletSchema);
exports.default = Wallet;
