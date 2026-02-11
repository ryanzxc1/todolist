package com.example.back.dto.response.todo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.response.ResponseDto;

import lombok.Getter;

@Getter
public class PatchTodoResponseDto extends ResponseDto{
    private PatchTodoResponseDto(String code, String message) {
        super(code,message);
    }
    public static ResponseEntity<PatchTodoResponseDto> success() {
        PatchTodoResponseDto result = new PatchTodoResponseDto(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    public static ResponseEntity<ResponseDto> notExistTodo() {
        PatchTodoResponseDto result = new PatchTodoResponseDto(ResponseCode.NOT_EXIST_TODO, ResponseMessage.NOT_EXIST_TODO);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }   

    public static ResponseEntity<ResponseDto> notExistUser() {
        PatchTodoResponseDto result = new PatchTodoResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
    }

    public static ResponseEntity<ResponseDto> noPermission() {
        ResponseDto result = new ResponseDto(ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(result);
    }
}
