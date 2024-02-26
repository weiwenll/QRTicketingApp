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