export interface RegisterDetails {
  username: string;
  email: string;
  password: string;
  contactnumber: string;
  role: string;
}

export interface RegisterResponse {
  success: boolean;
  result?: RegisterDetails;
  message?: string;
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
