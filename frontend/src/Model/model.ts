export interface RegisterDetails {
    username: string;
    email: string;
    password: string;
    contactnumber: string;
    role: string;
}

export interface RegisterResponse {
    success : boolean,
    result?: RegisterDetails,
    message?: string
    data? : string | null
}

export interface LoginDetails{
    email:string,
    password: string
}