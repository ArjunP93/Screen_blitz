console.log(`${process.env.CLIENT_STRIPE_PAYMENT_REDIRECT_URL}success`)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PaymentServices = {
    generateStripePaymentUrl: async (
    userId: string,
    userMail:string|any,
    movieName: string,
    totalAmount: number,

  ) => {
    try {
      console.log("got to payment service....", userId, movieName, totalAmount);
    const session = await stripe.checkout.sessions.create({
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
            unit_amount: totalAmount*100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_STRIPE_PAYMENT_REDIRECT_URL}/success`,
      cancel_url: `${process.env.CLIENT_STRIPE_PAYMENT_REDIRECT_URL}/cancel`,
    //   success_url: `https://www.instagram.com/`,
    //   cancel_url: `https://www.instagram.com/`,
    });

    return session;
    } catch (error) {
      console.log("error creating chekout session",error)
    }
    
  },
};

export default PaymentServices;
