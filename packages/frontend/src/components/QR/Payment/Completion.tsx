import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Completion: React.FC= () => { 
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Convert URLSearchParams to object
  const paramsObj = Object.fromEntries(params.entries());
  const navigate = useNavigate();

  // Now you can access the parameters as a JSON object
  const {
    journeyType,
    groupSize,
    operatorId,
    startDatetime,
    endDatetime,
    departurePoint,
    arrivalPoint,
    paymentRefNo,
    amount,
    currency,
    phoneNo,
    email,
  } = paramsObj;

  const purchaseTicket = async () => {
    try {
      const params = { ...paramsObj};
      const response = await axios.post(
        "http://localhost:5500/tg_query_api/api/v1/tickets/PurchaseTicket",
        params,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = response.data;
      setLoading(false);
      setSuccess(true);
      // Navigate to Payment component with state
      navigate('/viewQRTickets');
    } catch (error) {
      console.error('Error fetching points:', error);
      setError("An error occurred while processing your request.");
      setLoading(false);
    }
  };

  useEffect(() => {
    purchaseTicket();
  }, []);

  return (
    <center>
      {loading && <h1>Loading...</h1>}
      {success && <h1>Thank you! 🎉</h1>}
      {error && <h1>Error: {error}</h1>}
    </center>
  );
};

export default Completion;
