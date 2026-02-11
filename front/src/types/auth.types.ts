export interface SignUpRequest {
  email: string;
  password: string;
  nickname?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  code: string;
  message: string;
  token: string;
  expirationTime: number;
}

export interface SignUpResponse {
  code: string;
  message: string;
}

export interface ResponseDto {
  code: string;
  message: string;
}