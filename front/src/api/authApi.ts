import axiosInstance from '../utils/axiosInstance';
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../types/auth.types';

export const authApi = {
  signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
    const response = await axiosInstance.post<SignUpResponse>('/auth/sign-up', data);
    return response.data;
  },

  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    const response = await axiosInstance.post<SignInResponse>('/auth/sign-in', data);
    return response.data;
  },
};