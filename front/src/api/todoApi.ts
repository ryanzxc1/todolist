import axiosInstance from '../utils/axiosInstance';
import {
  GetTodoResponse,
  PostTodoRequest,
  PostTodoResponse,
  PatchTodoRequest,
  PatchTodoResponse,
  DeleteTodoResponse,
} from '../types/todo.types';

export const todoApi = {
  getTodos: async (email: string): Promise<GetTodoResponse> => {
    const response = await axiosInstance.get<GetTodoResponse>(`/todo/${email}`);
    return response.data;
  },

  createTodo: async (data: PostTodoRequest): Promise<PostTodoResponse> => {
    const response = await axiosInstance.post<PostTodoResponse>('/todo', data);
    return response.data;
  },

  updateTodo: async (todoId: number, data: PatchTodoRequest): Promise<PatchTodoResponse> => {
    const response = await axiosInstance.patch<PatchTodoResponse>(`/todo/${todoId}`, data);
    return response.data;
  },

  deleteTodo: async (todoId: number): Promise<DeleteTodoResponse> => {
    const response = await axiosInstance.delete<DeleteTodoResponse>(`/todo/${todoId}`);
    return response.data;
  },
};