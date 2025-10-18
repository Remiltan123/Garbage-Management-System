export interface RegisterDetails {
  username: string;
  email: string;
  password: string;
  contactnumber: string;
  role: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  contactNumber: string;
  role: string;
}

export interface AuthData {
  user: User;
  token: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: AuthData | null;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: AuthData;
  token?: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}

export interface GarbageReport {
  _id: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  reporterName: string;
  reporter?: string;
  weight: number;
  collectionDeadline: string;
  additionalDetails: string;
  garbageImage: string;
  status: string;
  collector: string;
  points: number;
  createdAt: string;
  updatedAt: string;
  assignedAt?: string;
  __v: number;
}

export interface GarbageReportsResponse {
  success: boolean;
  data: GarbageReport[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
