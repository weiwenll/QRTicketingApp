import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios, { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import CustomNavbar from "../../CustomNavbar";
import { getSessionUserData } from "../../Utils";
import Layout from "../../Layout";

const Payment: React.FC = () => {

  const location = useLocation();
  const purchaseTicketRequest = location.state?.purchaseTicketRequest;
  console.info(purchaseTicketRequest);

  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [hasFetchedPaymentIntent, setHasFetchedPaymentIntent] = useState(false);

  const stripePromise = loadStripe("pk_test_51O42D0Fcp66ilBOoUKBwbM6SsFcD7PxYFa9DS2TC52LEMcQaRftJvT1r5KrqgUMGF3WujJo3bW33EvCpVp2MMdLL00r06Ele0x");

  //Get session user data
  const sessionUserData = getSessionUserData();

  useEffect(() => {

    console.log("use effect ");

    const fetchPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5500/tg_query_api/api/v1/payments/CreatePaymentIntent",
          {
            email: sessionUserData?.email,
            currency: purchaseTicketRequest.currency,
            allowFutureUsage: true,
            amount: 100
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );

        setClientSecret(response.data.ResponseData.clientSecret);
        setPaymentIntentId(response.data.ResponseData.paymentIntentId);
        purchaseTicketRequest.paymentRefNo = response.data.ResponseData.paymentIntentId;
      } catch (error) {
        console.error("Error fetching payment intent:", error);
        // Handle error gracefully, e.g., display an error message to the user
      }
      setHasFetchedPaymentIntent(true);
    };

    if (!hasFetchedPaymentIntent) {
      fetchPaymentIntent();
    }
  }, [hasFetchedPaymentIntent]);

  return (
    <Layout>
      <div>
        <center><h3>Payment Confirmation</h3></center>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm purchaseTicketRequest={purchaseTicketRequest} />
          </Elements>
        )}
      </div>
    </Layout>
  );
}

export default Payment;