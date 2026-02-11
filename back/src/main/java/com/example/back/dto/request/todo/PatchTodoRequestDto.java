package com.example.back.dto.request.todo;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PatchTodoRequestDto {
    
    
    private String title;
    
    private String content;
    
    private String dueDate;
    
    private Boolean isCompleted;
}
