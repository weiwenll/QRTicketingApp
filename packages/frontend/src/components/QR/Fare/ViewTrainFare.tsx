import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import Utils from '../../Utils';
import Layout from '../../Layout';
import { ApiMethod, fetchDataWithoutParam } from '../../../services/ApiUtils';

const ViewTrainFare: React.FC = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<any[]>([]);
  const [ticketTypes, setTicketTypes] = useState<any[]>([]);

  const ticketTypeList = [
    { id: 1, name: 'ADULT' },
    { id: 2, name: 'CHILD' },
    { id: 3, name: 'SENIOR' }
    // Add more items as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const response = await fetchDataWithoutParam(ApiMethod.GETALLTRAINFARE);
        setDataList(response.data.ResponseData); // Set the entire response data
        setTicketTypes(ticketTypeList);

      } catch (error) {
        console.error("Error fetching Train Fare:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <h3 className="text-center mb-3">View Train Fare</h3>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '30vh' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Source Station</th>
                <th>Destination Station</th>
                <th>Ticket Type</th>
                <th>Fare($)</th>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data, index) => (
                <tr key={index}>
                  <td>{data.sourceStation.stnFullName}</td>
                  <td>{data.destinationStation.stnFullName}</td>
                  <td>{Utils.getTicketTypeLabel(data.pk.ticketTypeId)}</td>
                  <td>{data.fare}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </Layout>
  );
}
export default ViewTrainFare;
