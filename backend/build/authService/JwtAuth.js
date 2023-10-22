"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configKeys_1 = require("../config/configKeys");
const generateJWT = (payloadId, payloadRole) => {
    const jwtPayload = { unique_id: payloadId, role: payloadRole };
    if (configKeys_1.configKeys.JWT_SECRET_KEY) {
        return jsonwebtoken_1.default.sign(jwtPayload, configKeys_1.configKeys.JWT_SECRET_KEY, { expiresIn: configKeys_1.configKeys.JWT_EXPIRATION });
    }
};
exports.generateJWT = generateJWT;
const verifyJWT = (token) => {
    if (configKeys_1.configKeys.JWT_SECRET_KEY) {
        const result = jsonwebtoken_1.default.verify(token, configKeys_1.configKeys.JWT_SECRET_KEY);
        console.log('result in verify', result);
        return result;
    }
};
exports.verifyJWT = verifyJWT;
