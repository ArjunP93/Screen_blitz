"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PaymentServices = {
    generateStripePaymentUrl: (userId, userMail, movieName, totalAmount) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const successId = (0, uuid_1.v4)(); // create uniqe id for successpage
            console.log("got to payment service....", userId, movieName, totalAmount);
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: [
                    {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                //   user: userId,
                                //   email:userMail,
                                name: movieName,
                            },
                            unit_amount: totalAmount * 100,
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.CLIENT_STRIPE_PAYMENT_REDIRECT_URL}/success/${successId}`,
                cancel_url: `${process.env.CLIENT_STRIPE_PAYMENT_REDIRECT_URL}/cancel`,
                //   success_url: `https://www.instagram.com/`,
                //   cancel_url: `https://www.instagram.com/`,
            });
            return { session: session, successId: successId };
        }
        catch (error) {
            console.log("error creating chekout session", error);
        }
    }),
};
exports.default = PaymentServices;
