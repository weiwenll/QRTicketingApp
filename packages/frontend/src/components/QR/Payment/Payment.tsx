import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { getSessionUserData } from "../../Utils";
import { ApiMethod, postDataByParams } from "../../../services/ApiUtils";
import { PurchaseTicketRequest } from '../Payment/CheckOut';

interface Props {
  purchaseTicketRequest: PurchaseTicketRequest,
  setPurchaseTicketRequest: Dispatch<SetStateAction<PurchaseTicketRequest>>,
  changeStatus:Dispatch<SetStateAction<{
      [k: number]: boolean;
  }>>
}

const Payment: React.FC<Props> = (props:Props) => {

  const {purchaseTicketRequest,setPurchaseTicketRequest,changeStatus} = props;
  console.info(purchaseTicketRequest);

  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  // const [hasFetchedPaymentIntent, setHasFetchedPaymentIntent] = useState(false);

  const stripePromise = loadStripe("pk_test_51O42D0Fcp66ilBOoUKBwbM6SsFcD7PxYFa9DS2TC52LEMcQaRftJvT1r5KrqgUMGF3WujJo3bW33EvCpVp2MMdLL00r06Ele0x");

  //Get session user data
  const sessionUserData = getSessionUserData();
  const [newAmount, setNewAmount] = useState<number>(0);

  const fetchFare = async () => {
    try {
      const params = {
        srcStnId: purchaseTicketRequest.departurePoint,
        destStnId: purchaseTicketRequest.arrivalPoint,
        ticketType: purchaseTicketRequest.journeyType,
        journeyType: purchaseTicketRequest.journeyType,
        groupSize: purchaseTicketRequest.groupSize
      };

      const response = await postDataByParams(ApiMethod.GETTRAINFARE,
        params,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      const data = response.data;
      setNewAmount(data.ResponseData.fare);
      return data.ResponseData.fare; // Return the fare amount for use in fetchPaymentIntent()
    } catch (error) {
      console.error('Error fetching points:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
  };

  const fetchPaymentIntent = async (amount: number) => {
    try {
      const response = await postDataByParams(ApiMethod.CREATEPAYMENTINTENT,
        {
          email: sessionUserData?.isAuthenticated ? sessionUserData.email : purchaseTicketRequest.email,
          currency: purchaseTicketRequest.currency,
          allowFutureUsage: true,
          amount: amount * 100
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setClientSecret(response.data.ResponseData.clientSecret);
      setPaymentIntentId(response.data.ResponseData.paymentIntentId);

      setPurchaseTicketRequest((purchaseTicketRequest: PurchaseTicketRequest) => ({
        ...purchaseTicketRequest,
        paymentRefNo: paymentIntentId,
        amount: newAmount
      })) 

    } catch (error) {
      console.error("Error fetching payment intent:", error);
      // Handle error gracefully, e.g., display an error message to the user
    } 
  };

  useEffect(() => {
    const fetchDataAndPaymentIntent = async () => {
      const fareAmount = await fetchFare();
      if (fareAmount) {
        fetchPaymentIntent(fareAmount);
      }
    };
    fetchDataAndPaymentIntent();
  }, []);  

  return (
    <div>
      <center><h3>Payment Confirmation</h3></center>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm purchaseTicketRequest={purchaseTicketRequest} changeStatus={changeStatus} />
        </Elements>
      )}
    </div>
  );
}

export default Payment;