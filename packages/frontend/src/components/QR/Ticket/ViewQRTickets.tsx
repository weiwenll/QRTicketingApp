import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import QRCodeGenerator from './QRCodeGenerator';
import Utils, { getSessionUserData } from '../../Utils';
import Layout from '../../Layout';
import { ApiMethod, fetchDataByParam } from '../../../services/ApiUtils';

const ViewQRTickets: React.FC = () => {

  const [qrDataList, setQRDataList] = useState<any[]>([]);
  const [showQRPopup, setShowQRPopup] = useState(false);
  const [selectedQRData, setSelectedQRData] = useState<any>(null);
  //Get session user data
  const sessionUserData = getSessionUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          email: 'insaneappcreator@gmail.com'
        };

        const response = await fetchDataByParam(ApiMethod.GETTICKETS, {
          params
        });

        setQRDataList(response.data.ResponseData); // Set the entire response data

      } catch (error) {
        console.error("Error fetching QR tickets:", error);
      }
    };

    fetchData();
  }, []);

  const handleCloseQRPopup = () => {
    setShowQRPopup(false);
  };

  const handleViewTicket = (qrData: any) => {
    setSelectedQRData(qrData);
    setShowQRPopup(true);
  };

  return (
    <Layout>
      <div>
        <h3 className="text-center mb-3">View Ticket</h3>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '30vh' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Departure Point</th>
                <th>Arrival Point</th>
                <th>Status</th>
                <th>Effective Datetime</th>
                <th>Journey Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {qrDataList.map((qrData, index) => (
                <tr key={index}>
                  <td>{qrData.serialNumber}</td>
                  <td>{qrData.departurePoint}</td>
                  <td>{qrData.arrivalPoint}</td>
                  <td>{Utils.getStatusLabel(qrData.status)}</td>
                  <td>{Utils.millisecondsToDateyyyyMMdd(qrData.effectiveDatetime)}</td>
                  <td>{Utils.getJourneyTypeLabel(qrData.journeyType)}</td>
                  <td>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3"
                      onClick={() => handleViewTicket(qrData)}
                    >
                      View Ticket
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showQRPopup} onHide={handleCloseQRPopup}>
            <Modal.Header closeButton>
              <Modal.Title>QR Code</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedQRData && <QRCodeGenerator qrData={selectedQRData} />} {/* Pass qrData as prop if available */}
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </Layout>
  );
}
export default ViewQRTickets;
