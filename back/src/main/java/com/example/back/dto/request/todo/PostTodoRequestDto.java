package com.example.back.dto.request.todo;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostTodoRequestDto {
    @NotBlank(message = "제목은 필수 입력 사항입니다.")
    private String title;
    @NotBlank(message = "제목은 필수 입력 사항입니다.")
    private String content;
    private String dueDate;
}
