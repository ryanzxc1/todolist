package com.example.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back.dto.request.todo.PatchTodoRequestDto;
import com.example.back.dto.request.todo.PostTodoRequestDto;
import com.example.back.dto.response.todo.DeleteTodoResponseDto;
import com.example.back.dto.response.todo.GetTodoResponseDto;
import com.example.back.dto.response.todo.PatchTodoResponseDto;
import com.example.back.dto.response.todo.PostTodoResponseDto;
import com.example.back.service.TodoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/v1/todo")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{email}")
    public ResponseEntity<? super GetTodoResponseDto> getTodoList(@PathVariable("email") String email) {
        ResponseEntity<? super GetTodoResponseDto> response = todoService.getTodo(email);
        return response;
    }
    

    @PostMapping("")
    public ResponseEntity<? super PostTodoResponseDto> postTodo(@RequestBody @Valid PostTodoRequestDto dto, @AuthenticationPrincipal String email) { 
        ResponseEntity<? super PostTodoResponseDto> response = todoService.postTodo(dto, email);
        return response; 
    }

    @PatchMapping("/{todoId}")
    public ResponseEntity<? super PatchTodoResponseDto> patchTodo(@RequestBody @Valid PatchTodoRequestDto requestBody, @PathVariable("todoId") Long todoId, @AuthenticationPrincipal String email) {
    ResponseEntity<? super PatchTodoResponseDto> response = todoService.patchTodo(requestBody, todoId, email);
    return response;
    }
    
    @DeleteMapping("/{todoId}")
    public ResponseEntity<? super DeleteTodoResponseDto> deleteTodo(@PathVariable("todoId") Long todoId, @AuthenticationPrincipal String email) {
    ResponseEntity<? super DeleteTodoResponseDto> response = todoService.deleteTodo(todoId, email);
    return response;
    }
}
