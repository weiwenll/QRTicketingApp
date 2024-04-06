import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Layout from '../../Layout';
import PurchaseTicket from '../Ticket/PurchaseTicket';
import Payment from './Payment';

interface  PurchaseTicketRequest {
  journeyType: number,
  groupSize: number,
  operatorId: number,
  startDatetime: number,
  endDatetime: number,
  departurePoint: number,
  arrivalPoint: number,
  departurePointDes: string,
  arrivalPointDes: string,
  paymentRefNo: string,
  amount: number,
  currency: "SGD", // Overriding currency with a default value
  phoneNo: "1122334455", // Overriding phone number with a default value
  email: string,
};


const steps = ['Purchase Ticket', 'Payment'];

const CheckOut = () => {

  const [purchaseTicketRequest, setPurchaseTicketRequest] = useState<PurchaseTicketRequest>({
    journeyType: 0,
    groupSize: 0,
    operatorId: 0,
    startDatetime: 0,
    endDatetime: 0,
    departurePoint: 0,
    arrivalPoint: 0,
    departurePointDes: '',
    arrivalPointDes: '',
    paymentRefNo: '',
    amount: 0,
    currency: "SGD", // Overriding currency with a default value
    phoneNo: "1122334455", // Overriding phone number with a default value
    email: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});


  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
  <Layout>
      <Box sx={{ width: '50%', mx: 'auto'}}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)} disabled={completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        { activeStep === 0 && <PurchaseTicket 
              changeStatus= {setCompleted} 
              changeStep= {setActiveStep} 
              purchaseTicketRequest= {purchaseTicketRequest}
              setPurchaseTicketRequest = {setPurchaseTicketRequest}
        />  }
        { activeStep === 1 && <Payment 
          changeStatus= {setCompleted} 
          changeStep= {setActiveStep} 
          purchaseTicketRequest= {purchaseTicketRequest}
          setPurchaseTicketRequest = {setPurchaseTicketRequest}
        />  }
      </Box>
    </Layout>
  );
}

export default CheckOut

export type {PurchaseTicketRequest}
