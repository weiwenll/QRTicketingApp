import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import CustomNavbar from '../../CustomNavbar';
import axios from 'axios';
import Layout from '../../Layout';
import { getSessionUserData } from '../../Utils';
import { ApiMethod, fetchDataWithoutParam } from '../../../services/ApiUtils';

const PurchaseTicket: React.FC = () => {


    //Get session user data
    const sessionUserData = getSessionUserData();

    const [journeyType, setJourneyType] = useState<number>(0);
    const [groupSize, setGroupSize] = useState<number>(1);
    const [operatorId, setOperatorId] = useState<number>(0);
    const [startDatetime, setStartDatetime] = useState<number>(0);
    const [endDatetime, setEndDatetime] = useState<number>(0);
    const [paymentRefNo, setPaymentRefNo] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const [departurePoint, setDeparturePoint] = useState<number>(0);
    const [arrivalPoint, setArrivalPoint] = useState<number>(0);

    const [departurePoints, setDeparturePoints] = useState<any[]>([]);
    const [arrivalPoints, setArrivalPoints] = useState<any[]>([]);
    const [journeyTypes, setJourneyTypes] = useState<any[]>([]);

    const [departurePointDes, setDeparturePointDes] = useState<string>('');
    const [arrivalPointDes, setArrivalPointDes] = useState<string>('');

    const navigate = useNavigate();

    const journeyTypeList = [
        { id: 1, name: 'Single Journey' },
        { id: 2, name: 'Return Ticket' },
        { id: 3, name: 'Group Ticket' }
        // Add more items as needed
    ];

    const fetchPoints = async () => {
        try {
            const response = await fetchDataWithoutParam(ApiMethod.GETTRAINROUTES);
            const data = response.data;
            setDeparturePoints(data.ResponseData);
            setArrivalPoints(data.ResponseData);
            // Update the state with the JSON list
            setJourneyTypes(journeyTypeList);
        } catch (error) {
            console.error('Error fetching points:', error);
            // Handle the error appropriately, e.g., display an error message to the user
        }
    };

    useEffect(() => {
        setEmail(sessionUserData?.email || 'insaneappcreator@gmail.com');
        fetchPoints();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError('');
        setSuccess(false);

        // Basic validation checks
        /*if (!paymentRefNo || !amount || !currency || !phoneNo || !email) {
            setError('All fields are required.');
            return;
        }*/

        // Your additional validation logic goes here

        const purchaseTicketRequest = {
            journeyType,
            groupSize,
            operatorId,
            startDatetime,
            endDatetime,
            departurePoint,
            arrivalPoint,
            departurePointDes,
            arrivalPointDes,
            paymentRefNo,
            amount,
            currency,
            phoneNo,
            email,
        };

        purchaseTicketRequest.amount = 100;
        purchaseTicketRequest.currency = "sgd";
        purchaseTicketRequest.phoneNo = "1122334455";

        // Navigate to Payment component with state
        navigate('/payment', { state: { purchaseTicketRequest: purchaseTicketRequest } });

    };

    return (
        <Layout>
            <div>
                <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '30vh', marginTop: '100px' }}>
                    <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                        <h3 className="text-center mb-3">Purchase Ticket</h3>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="formJourneyType" className="mb-3">
                                    <Form.Label>Journey Type  *</Form.Label>
                                    <Form.Select value={journeyType} onChange={(e) => setJourneyType(parseInt(e.target.value))} required>
                                        <option value="">Select Journey Type</option>
                                        {journeyTypes.map((point) => (
                                            <option key={point.id} value={point.id}>
                                                {point.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGroupSize">
                                    <Form.Label>Group Size *</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter Group Size"
                                        value={groupSize}
                                        onChange={(e) => setGroupSize(parseInt(e.target.value))}
                                        min={1} // Set the minimum value to 1
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={6}>
                                <Form.Group controlId="formStartDatetime" className="mb-3">
                                    <Form.Label>Start Datetime *</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={startDatetime ? new Date(startDatetime).toISOString().slice(0, -1) : ''}
                                        onChange={(e) => {
                                            const localTime = new Date(e.target.value);
                                            const offset = localTime.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
                                            setStartDatetime(localTime.getTime() - offset);
                                        }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formEndDatetime" className="mb-3">
                                    <Form.Label>End Datetime *</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        value={endDatetime ? new Date(endDatetime).toISOString().slice(0, -1) : ''}
                                        onChange={(e) => {
                                            const localTime = new Date(e.target.value);
                                            const offset = localTime.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
                                            setEndDatetime(localTime.getTime() - offset);
                                        }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="formDeparturePoint" className="mb-3">
                                    <Form.Label>Departure Point *</Form.Label>
                                    <Form.Select value={departurePoint} onChange={(e) => {
                                        setDeparturePoint(parseInt(e.target.value));
                                        const selectedDeparturePoint = departurePoints.find(point => point.stnId === parseInt(e.target.value));
                                        if (selectedDeparturePoint) {
                                            setDeparturePointDes(selectedDeparturePoint.stnName);
                                        }
                                    }} required>
                                        <option value="">Select Departure</option>
                                        {departurePoints.map((point) => (
                                            <option key={point.stnId} value={point.stnId}>
                                                {point.stnName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formArrivalPoint" className="mb-3">
                                    <Form.Label>Arrival Point *</Form.Label>
                                    <Form.Select value={arrivalPoint} onChange={(e) =>{
                                        setArrivalPoint(parseInt(e.target.value))
                                        const selectedArrivalPoint = arrivalPoints.find(point => point.stnId === parseInt(e.target.value));
                                        if (selectedArrivalPoint) {
                                            setArrivalPointDes(selectedArrivalPoint.stnName);
                                        }
                                    }} required>
                                        <option value="">Select Arrival</option>
                                        {arrivalPoints.map((point) => (
                                            <option key={point.stnId} value={point.stnId}>
                                                {point.stnName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Search
                        </Button>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        {success && <div className="alert alert-success" role="alert">Purchase successful!</div>}
                    </Form>
                </Container>
            </div>
        </Layout>
    );
};

export default PurchaseTicket;