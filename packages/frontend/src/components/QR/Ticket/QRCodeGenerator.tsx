import React from 'react';
import QRCode from 'qrcode.react';
import Utils from '../../Utils';
import { Button } from 'react-bootstrap';

interface Props {
  qrData: {
    qrData: string;
    serialNumber: string;
    departurePoint: number;
    arrivalPoint: number;
    status: number;
    effectiveDatetime: number;
    journeyType: number;
  };
}

const QRCodeGenerator: React.FC<Props> = ({ qrData }) => {
  const statusLabel = Utils.getStatusLabel(qrData.status);

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    
    const url = canvas.toDataURL('image/png', 1.0);

    const link = document.createElement('a');
    link.download = 'QRCode.png';
    link.href = url;
    link.click();
  };

  console.info(qrData.qrData);
  return (
    <div>
      <div><center><QRCode id="qr-code" value={qrData.qrData}
       size={256} className='qr-code'/>
       </center></div>
      <div>Serial Number: {qrData.serialNumber}</div>
      <div>Status: {statusLabel}</div>
      <div>
        <Button
          variant="primary"
          type="button"
          className="w-100 mb-3"
          onClick={downloadQRCode}
        >
          Download QR Code
        </Button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
