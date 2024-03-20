export interface UserRegistrationData {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface SessionUserData {
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

export interface LayoutProps {  
  children: React.ReactNode;
}

export interface CheckoutProps {
  purchaseTicketRequest: {
    journeyType: number,
    groupSize: number,
    operatorId: number,
    startDatetime: number,
    endDatetime: number,
    departurePoint: number,
    arrivalPoint: number,
    paymentRefNo: string,
    amount: number,
    currency: string,
    phoneNo: string,
    email: string
  }
}

export interface QRDataProps {
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