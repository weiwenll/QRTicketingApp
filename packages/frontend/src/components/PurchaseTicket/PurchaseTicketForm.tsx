import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap';

enum JourneyType {
  Single = 1,
  ReturnTicket, 
  Group
}

interface PurchaseTicketRequest {
  ticketType: number,
  journeyType: JourneyType,
  groupSize: number,
  phoneNo: string,
  email: string,
  creationDateTime: Date,
  effectiveDateTime: Date,
  startDateTime: Date,
  endDateTime: Date
}

const initialPurchaseTicketRequest: PurchaseTicketRequest = {
  ticketType: 0,
  journeyType: 1,
  groupSize: 0,
  phoneNo: "",
  email: "",
  creationDateTime: new Date(),
  effectiveDateTime: new Date(),
  startDateTime: new Date(),
  endDateTime: new Date()
};


const PurchaseTicketForm: React.FC = () => {
    const [ purchaseTicketRequest, setPurchaseTicketRequest ] = useState<PurchaseTicketRequest>(initialPurchaseTicketRequest);

    const formOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('formonchange')
      const {name, value } = event.target as HTMLInputElement
      setPurchaseTicketRequest(purchaseTicketRequest => ({
         ...purchaseTicketRequest, 
         [name] : value 
      }));

    }

    const formOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log('formonchange')
      const {name, value } = event.target as HTMLSelectElement
      setPurchaseTicketRequest(purchaseTicketRequest => ({
         ...purchaseTicketRequest, 
         [name] : value 
      }));

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("ticket purchased as user")
    };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '330px' }}>
        <h3 className="text-center mb-3">Ticket Purchase Form</h3>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            name='email'
            placeholder="Enter your email"
            value={purchaseTicketRequest.email}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name='phoneNo'
            placeholder="Enter your email"
            value={purchaseTicketRequest?.phoneNo}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Ticket Type</Form.Label>
          <Form.Control
            type="text"
            name='ticketType'
            placeholder="Enter your email"
            value={purchaseTicketRequest?.ticketType}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Journey Type</Form.Label>
          <Form.Select name='journeyType' onSelect={formOnSelect} required aria-label="Default select example">
            <option>Select Journey Type</option>
            <option value={JourneyType.Single}>Single</option>
            <option value={JourneyType.Group}>Group</option>
            <option value={JourneyType.ReturnTicket}>ReturnTicket</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Group Size</Form.Label>
          <Form.Control
            type="number"
            name='groupSize'
            placeholder="Enter your email"
            value={purchaseTicketRequest?.groupSize}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Creation DateTime</Form.Label>
          <Form.Control
            type="text"
            name='creationDateTime'
            placeholder="Enter your email"
            value={purchaseTicketRequest?.creationDateTime.toDateString()}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Effective DateTime</Form.Label>
          <Form.Control
            type="text"
            name='effectiveDateTime'
            placeholder="Enter your email"
            value={purchaseTicketRequest?.effectiveDateTime.toDateString()}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Start DateTime</Form.Label>
          <Form.Control
            type="text"
            name='startDateTime'
            placeholder="Enter your email"
            value={purchaseTicketRequest?.startDateTime.toDateString()}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>End DateTime</Form.Label>
          <Form.Control
            type="text"
            name='endDateTime'
            placeholder="Enter your email"
            value={purchaseTicketRequest?.endDateTime.toDateString()}
            onChange={formOnChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-3">
          Purchase Ticket
        </Button>

      </Form> 
    </Container>
  )
}

export default PurchaseTicketForm









