import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios, { AxiosError } from "axios";

function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const [hasFetchedPaymentIntent, setHasFetchedPaymentIntent] = useState(false);
  
  const stripePromise = loadStripe("pk_test_51O42D0Fcp66ilBOoUKBwbM6SsFcD7PxYFa9DS2TC52LEMcQaRftJvT1r5KrqgUMGF3WujJo3bW33EvCpVp2MMdLL00r06Ele0x");

  useEffect(() => {

    console.log("use effect ");    

    const fetchPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/tg_query_api/api/v1/payments/CreatePaymentIntent",
          {
            email: 'zmt@nus.com',
            currency: 'sgd',
            allowFutureUsage: true,
            amount: 100
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );

        setClientSecret(response.data.ResponseData.clientSecret);
        setPaymentIntentId(response.data.ResponseData.paymentIntentId);
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
    <>
      <center><h1>React Stripe and the Payment Element</h1></center>      
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;