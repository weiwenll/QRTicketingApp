import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap';

interface IDataStation {
    stnId: number,
    stnCode: string,
    stnName: string
}

const PurchaseTicketForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [station, setStation] = useState<IDataStation[]>([])
    //const [data, setData] = useState([]);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("ticket purchased as user")
    };

    useEffect(() => {
        const GetPost = async () => {
          const response = await fetch('http://localhost:2000/tg_query_api/api/v1/routes/GetTrainRoutes', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            }
          })
          const json = await response.json()
          const responseData = json.ResponseData as IDataStation[]
          if (response.ok) setStation(responseData)
        }
        GetPost()
      }, [])

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '330px' }}>
        <h3 className="text-center mb-3">Ticket Purchase Form</h3>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           {emailError && <div className="text-danger">{emailError}</div>}
        </Form.Group>
        <Form.Group controlId="formDestinationFrom" className="mb-3">
          <Form.Label>Destination From*</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select Stations</option>
                {station.map((stn:IDataStation) => {
                    return <option key={stn.stnId} value={stn.stnId}>{stn.stnName}</option>
                })}
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="formDestinationTo" className="mb-3">
          <Form.Label>Destination To**</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select Stations</option>
                {station.map((stn:IDataStation) => {
                    return <option key={stn.stnId} value={stn.stnId}>{stn.stnName}</option>
                })}
            </Form.Select>
        </Form.Group>
        <Form.Group controlId="DateFrom" className="mb-3">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           {emailError && <div className="text-danger">{emailError}</div>}
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-3">
          Login
        </Button>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">Login successful!</div>}
        <Form.Group className="text-muted text-center">
          Don't have an account? <a href="/register">Sign Up</a>
        </Form.Group>
      </Form> 
    </Container>
  )
}

export default PurchaseTicketForm








