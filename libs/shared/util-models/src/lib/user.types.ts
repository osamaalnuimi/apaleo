// Address interface with coordinates
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

// Hair details interface
export interface Hair {
  color: string;
  type: string;
}

// Bank details interface
export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

// Company interface
export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

// Crypto details interface
interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

// User role type
export type UserRole = 'admin' | 'moderator' | 'user';

// Main user interface
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: UserRole;
}
export interface UserDataTable {
  firstName: string;
  lastName: string;
  age: number;
  address: Address;
}
// API response interface
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
