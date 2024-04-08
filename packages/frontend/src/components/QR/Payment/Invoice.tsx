import React, { Dispatch, SetStateAction } from 'react'
import { PurchaseTicketRequest } from './CheckOut';
import Box from '@mui/material/Box';

interface Props {
  purchaseTicketRequest: PurchaseTicketRequest,
  changeStatus:Dispatch<SetStateAction<{
      [k: number]: boolean;
  }>>
}
const Invoice: React.FC<Props> = (props:Props) => {
  const {purchaseTicketRequest,changeStatus} = props;

  return (
    <Box sx={{ width: '50%', mx: 'auto'}}>
      {JSON.stringify(purchaseTicketRequest)}
    </Box>
  )
}

export default Invoice