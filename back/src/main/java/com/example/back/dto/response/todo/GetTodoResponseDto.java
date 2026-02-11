package com.example.back.dto.response.todo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.back.common.ResponseCode;
import com.example.back.common.ResponseMessage;
import com.example.back.dto.response.ResponseDto;
import com.example.back.entity.TodoEntity;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class GetTodoResponseDto extends ResponseDto {
    
    private List<TodoItem> todoList;

    private GetTodoResponseDto(List<TodoEntity> todoEntities){
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.todoList = TodoItem.getList(todoEntities);
    }

    public static ResponseEntity<GetTodoResponseDto> success(List<TodoEntity> todoEntities) {
        GetTodoResponseDto result = new GetTodoResponseDto(todoEntities);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
    public static ResponseEntity<ResponseDto> notExistTodo(){
        ResponseDto result = new ResponseDto(ResponseCode.NOT_EXIST_TODO, ResponseMessage.NOT_EXIST_TODO);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
    }

    @Getter
    public static class TodoItem{
        private Long todoId;
        private String title;
        private String content;
        private String dueDate;
        @JsonProperty("isCompleted")
        private boolean isCompleted; // boolean completed권장 is가 빠지기 때문
        private String writerEmail;
        
        public TodoItem(TodoEntity todoEntity) {
            this.todoId = todoEntity.getTodoId();
            this.title = todoEntity.getTitle();
            this.content = todoEntity.getContent();
            this.dueDate = todoEntity.getDueDate();
            this.isCompleted = todoEntity.isCompleted();
            this.writerEmail = todoEntity.getWriterEmail();
        }
        public static List<TodoItem> getList(List<TodoEntity> todoEntities) {
            List<TodoItem> list = new ArrayList<>();
            for (TodoEntity entity : todoEntities) {
                list.add(new TodoItem(entity));
            }
            return list;
        }
    }
}
