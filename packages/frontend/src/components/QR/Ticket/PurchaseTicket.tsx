import React, { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { getSessionUserData } from '../../Utils';
import { ApiMethod, fetchDataWithoutParam ,postDataByParams} from '../../../services/ApiUtils';
import mrtMap from '../../../assets/mrtMap.png';
import { PurchaseTicketRequest } from '../Payment/CheckOut';

interface Props {
    purchaseTicketRequest: PurchaseTicketRequest,
    setPurchaseTicketRequest: Dispatch<SetStateAction<PurchaseTicketRequest>>,
    changeStep:Dispatch<SetStateAction<number>>,
    changeStatus:Dispatch<SetStateAction<{
        [k: number]: boolean;
    }>>
}
const PurchaseTicket: React.FC<Props> = (props: Props) => {

    const {purchaseTicketRequest,setPurchaseTicketRequest,changeStatus,changeStep} = props;

    //Get session user data
    const sessionUserData = getSessionUserData();

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [departurePoints, setDeparturePoints] = useState<any[]>([]);
    const [arrivalPoints, setArrivalPoints] = useState<any[]>([]);
    const [journeyTypes, setJourneyTypes] = useState<any[]>([]);

    const journeyTypeList = [
        { id: 1, name: 'Single Journey' },
        { id: 2, name: 'Return Ticket' },
        { id: 3, name: 'Group Ticket' }
        // Add more items as needed
    ];

    const onChangeFormHandler = (event: any) => {
        event.preventDefault();
        setPurchaseTicketRequest((purchaseTicketRequest: PurchaseTicketRequest) => ({
            ...purchaseTicketRequest,
            [event.target.name] : event.target.name === 'email' ? event.target.value : parseInt(event.target.value)
        })) 
        console.log(purchaseTicketRequest)
    }

    const setAmount = (value: string) => {
        setPurchaseTicketRequest((purchaseTicketRequest: PurchaseTicketRequest) => ({
            ...purchaseTicketRequest,
            amount: parseInt(value)
        })) 
    }

    const setPointDesc = (value: string, point: string) => {
        setPurchaseTicketRequest((purchaseTicketRequest: PurchaseTicketRequest) => ({
            ...purchaseTicketRequest,
            [point]: value
        })) 
    }

    const setDateTime = (event: any) => {
        const localTime = new Date(event.target.value);
        const offset = localTime.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
        const result = localTime.getTime() - offset;
        setPurchaseTicketRequest((purchaseTicketRequest: PurchaseTicketRequest) => ({
            ...purchaseTicketRequest,
            [event.target.name]: result
        })) 
        console.log(purchaseTicketRequest)
    }


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
        // setEmail(sessionUserData?.email || 'insaneappcreator@gmail.com');
        fetchPoints();
    }, []);

   const fetchFare = async () => {
            try {

            const params = {
                srcStnId:purchaseTicketRequest.departurePoint,
                destStnId: purchaseTicketRequest.arrivalPoint,
                ticketType: purchaseTicketRequest.journeyType,
                journeyType: purchaseTicketRequest.journeyType,
                groupSize: purchaseTicketRequest.groupSize
            };

            const response = await postDataByParams(ApiMethod.GETTRAINFARE,
                params,
                {
                headers: { "Content-Type": "application/json" }
                }
            );
            const data = response.data;
            setAmount(data.ResponseData.fare);
            console.log(data.ResponseData.fare)
            return data.ResponseData.fare; 
            } catch (error) {
            console.error('Error fetching points:', error);
            // Handle the error appropriately, e.g., display an error message to the user
            }
        }; 
    
        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault(); // Don't forget to prevent default form submission
            
            setError('');
            setSuccess(false);
        
            try {
                // Fetch fare amount
                const fareAmount = await fetchFare();
                console.log("Fare amount: " + fareAmount);
        
                // Proceed only if fareAmount is valid
                if (!fareAmount || isNaN(fareAmount)) {
                    setError('Failed to fetch fare amount.');
                    return;
                }
    
            } catch (error) {
                console.error('Error handling submit:', error);
                setError('Failed to handle submit.');
            } finally {
                changeStatus({[0] : true})
                changeStep(1)
            }
        };
       
   
    return (
            <div>
                <Container className="d-flex align-items-center justify-content-center mb-3" style={{ minHeight: '30vh', marginTop: '50px' }}>
                   <Row>    
                    <Col>
                    <img
                        src={mrtMap} 
                        className="img-thumbnail"
                        alt="MRTMAP"
                        />
                    </Col>
                    <Col>
                    <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                        <h3 className="text-center mb-3">Purchase Ticket</h3>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="formJourneyType" className="mb-3">
                                    <Form.Label>Journey Type  *</Form.Label>
                                    <Form.Select name='journeyType' value={purchaseTicketRequest.journeyType} onChange={onChangeFormHandler} required>
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
                                        name='groupSize'
                                        value={purchaseTicketRequest.groupSize || ''}
                                        onChange={onChangeFormHandler}
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
                                        name='startDatetime'
                                        value={purchaseTicketRequest.startDatetime ? new Date(purchaseTicketRequest.startDatetime).toISOString().slice(0, -1) : ''}
                                        onChange={setDateTime}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group controlId="formEndDatetime" className="mb-3">
                                    <Form.Label>End Datetime *</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name='endDatetime'
                                        value={purchaseTicketRequest.endDatetime ? new Date(purchaseTicketRequest.endDatetime).toISOString().slice(0, -1) : ''}
                                        onChange={setDateTime}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="formDeparturePoint" className="mb-3">
                                    <Form.Label>Departure Point *</Form.Label>
                                    <Form.Select name='departurePoint' value={purchaseTicketRequest.departurePoint} onChange={(e) => {
                                        onChangeFormHandler(e);
                                        const selectedDeparturePoint = departurePoints.find(point => point.stnId === parseInt(e.target.value));
                                        if (selectedDeparturePoint) {
                                            setPointDesc(selectedDeparturePoint.stnName,'departurePointDesc');
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
                                    <Form.Select name='arrivalPoint' value={purchaseTicketRequest.arrivalPoint} onChange={(e) =>{
                                        onChangeFormHandler(e);
                                        const selectedArrivalPoint = arrivalPoints.find(point => point.stnId === parseInt(e.target.value));
                                        if (selectedArrivalPoint) {
                                            setPointDesc(selectedArrivalPoint.stnName,'arrivalPointDes');
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

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="formCalculateFare" className="mb-3">
                                    <Form.Label>Ticket Price *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name= "amount"
                                        value={purchaseTicketRequest.amount || ''}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col className="mt-3">
                            <Button  onClick={fetchFare} variant="primary" className="w-100 mt-3">
                                Calculate
                            </Button>
                           
                            </Col>
                        </Row>
                    
                         {!sessionUserData?.isAuthenticated === true &&
                        (
                           <Form.Group controlId="formGroupSize" className="mb-4">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name='email'
                                        placeholder="Enter Email"
                                        value={purchaseTicketRequest.email}
                                        onChange={onChangeFormHandler}
                                        required
                                    />
                            </Form.Group>
                         )
                    } 

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Proceed Payment
                        </Button>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        {success && <div className="alert alert-success" role="alert">Purchase successful!</div>}
                    </Form>
                   
                    </Col>
                   </Row>
                   
                   
                </Container>
            </div>
    );
};

export default PurchaseTicket;