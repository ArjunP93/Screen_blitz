import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Radio,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openPaymentGateway } from "../../../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import { setStripeId, setSuccessId } from "../../../redux/userSlice";

function MultiPaymentCard() {
  const dispatch = useDispatch();
  const [radioSelect, setRadioSelect] = useState("");
  const bookingData = useSelector((store) => store.user.userOperationsData);
  const grandTotal = bookingData.ticketCount * bookingData.ticketPrice;

  const user = useSelector((store) => store.user.userRedux);
  const handlePayment = async () => {
    const bookingDetails = {
      ...bookingData,
      gateway: radioSelect,
      userId: user.userId,
    };

    const response = await openPaymentGateway(bookingDetails);
    console.log("tesssssssssssst paymntid", response);
    localStorage.setItem("stripeId", response?.paymentURL?.session?.id);
    localStorage.setItem('sId',response?.paymentURL?.successId)
    dispatch(setStripeId(response?.paymentURL?.session?.id),setSuccessId(response?.paymentURL?.successId));
    const paymentURL = response?.paymentURL?.session?.url;
    console.log('paymentURL',paymentURL)

    // Navigate to the payment URL
    window.location.href = paymentURL;
  };
  return (
    <div>
      <Card>
        <CardBody>
          <div>
            <p className="text-lg uppercase font-bold">Amount</p>
            <div>
              <p className="text-sm p-4 font-semibold ">
                {grandTotal.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
          </div>
          <div className="text-lg uppercase font-bold">Payment Gateways</div>
          <div>
            <Radio
              color="purple"
              onClick={() => setRadioSelect("stripe")}
              label="Stripe Payment"
            ></Radio>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            onClick={handlePayment}
            disabled={radioSelect === "" ? true : false}
            color="deep-purple"
          >
            Proceed To Payment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default MultiPaymentCard;
