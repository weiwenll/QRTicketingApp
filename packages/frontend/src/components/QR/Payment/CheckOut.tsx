import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Layout from '../../Layout';
import PurchaseTicket from '../Ticket/PurchaseTicket';
import Payment from './Payment';

const steps = ['Purchase Ticket', 'Payment'];

const CheckOut = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };


  return (
  <Layout>
      <Box sx={{ width: '50%', mx: 'auto'}}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        { activeStep === 0 && <PurchaseTicket changeStatus= {setCompleted} changeStep= {setActiveStep} />  }
        { activeStep === 1 && <Payment/>  }
      </Box>
    </Layout>
  );
}

export default CheckOut
