export interface Todo {
  todoId: number;
  title: string;
  content: string;
  dueDate: string;
  isCompleted: boolean;
  writerEmail: string;
}

export interface PostTodoRequest {
  title: string;
  content: string;
  dueDate?: string;
}

export interface PatchTodoRequest {
  title?: string;
  content?: string;
  dueDate?: string;
  isCompleted?: boolean;
}

export interface GetTodoResponse {
  code: string;
  message: string;
  todoList: Todo[];  
}

export interface PostTodoResponse {
  code: string;
  message: string;
}

export interface PatchTodoResponse {
  code: string;
  message: string;
}

export interface DeleteTodoResponse {
  code: string;
  message: string;
}