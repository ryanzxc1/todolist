package com.example.back.entity;

import com.example.back.dto.request.todo.PatchTodoRequestDto;
import com.example.back.dto.request.todo.PostTodoRequestDto;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "todo")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TodoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Long todoId;
    private String title;
    private String content;
    @Column(name = "due_date")
    private String dueDate;
    @JsonProperty("isCompleted")
    @Column(name = "is_completed")
    private boolean isCompleted;
    @Column(name = "writer_email")
    private String writerEmail;

    public TodoEntity(PostTodoRequestDto dto, String email) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.dueDate = dto.getDueDate();
        this.isCompleted = false;
        
        this.writerEmail = email;
    }

    public void patch(PatchTodoRequestDto dto) {
    // 제목을 보냈을 때만 수정
    if (dto.getTitle() != null && !dto.getTitle().isBlank()) {
        this.title = dto.getTitle();
    }
    // 내용을 보냈을 때만 수정
    if (dto.getContent() != null && !dto.getContent().isBlank()) {
        this.content = dto.getContent();
    }
    // 날짜를 보냈을 때만 수정
    if (dto.getDueDate() != null && !dto.getDueDate().isBlank()) {
        this.dueDate = dto.getDueDate();
    }
    
    if (dto.getIsCompleted() != null) {
        this.isCompleted = dto.getIsCompleted();
    }
}
}
