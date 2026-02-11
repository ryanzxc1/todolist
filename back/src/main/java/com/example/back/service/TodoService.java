package com.example.back.service;

import org.springframework.http.ResponseEntity;

import com.example.back.dto.request.todo.PatchTodoRequestDto;
import com.example.back.dto.request.todo.PostTodoRequestDto;
import com.example.back.dto.response.todo.DeleteTodoResponseDto;
import com.example.back.dto.response.todo.GetTodoResponseDto;
import com.example.back.dto.response.todo.PatchTodoResponseDto;
import com.example.back.dto.response.todo.PostTodoResponseDto;

public interface TodoService {

    ResponseEntity<? super PostTodoResponseDto> postTodo(PostTodoRequestDto dto, String email);
    ResponseEntity<? super GetTodoResponseDto> getTodo(String email);
    ResponseEntity<? super PatchTodoResponseDto> patchTodo(PatchTodoRequestDto dto, Long todoId, String email);
    ResponseEntity<? super DeleteTodoResponseDto> deleteTodo(Long todoId, String email);
} 