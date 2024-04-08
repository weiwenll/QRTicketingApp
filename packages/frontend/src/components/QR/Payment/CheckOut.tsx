import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Layout from '../../Layout';
import PurchaseTicket from '../Ticket/PurchaseTicket';
import Payment from './Payment';
import Invoice from './Invoice';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
  currency: string, 
  phoneNo: string, 
  email: string,
};


const steps = ['Purchase Ticket', 'Payment', 'Invoice'];

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

  console.log(activeStep)
  console.log(completed)

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
        <React.Fragment>
        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button disabled={activeStep === 2} onClick={handleNext}>
            Next
          </Button>
        </Box>
      </React.Fragment>
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
        { activeStep === 2 && <Invoice 
          changeStatus= {setCompleted} 
          purchaseTicketRequest= {purchaseTicketRequest}
        />  }
      </Box>
    </Layout>
  );
}

export default CheckOut

export type {PurchaseTicketRequest}
