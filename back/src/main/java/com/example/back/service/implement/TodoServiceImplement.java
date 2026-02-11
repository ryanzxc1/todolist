package com.example.back.service.implement;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.back.dto.request.todo.PatchTodoRequestDto;
import com.example.back.dto.request.todo.PostTodoRequestDto;
import com.example.back.dto.response.ResponseDto;
import com.example.back.dto.response.todo.DeleteTodoResponseDto;
import com.example.back.dto.response.todo.GetTodoResponseDto;
import com.example.back.dto.response.todo.PatchTodoResponseDto;
import com.example.back.dto.response.todo.PostTodoResponseDto;
import com.example.back.entity.TodoEntity;
import com.example.back.repository.TodoRepository;
import com.example.back.repository.UserRepository;
import com.example.back.service.TodoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoServiceImplement implements TodoService{
    
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;
    @Override
    public ResponseEntity<? super GetTodoResponseDto> getTodo(String email) {
        List<TodoEntity> todoEntities = null;
        try{
            todoEntities = todoRepository.findByWriterEmailOrderByTodoIdDesc(email);
            
        } catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetTodoResponseDto.success(todoEntities);
    }
    
    @Override
    public ResponseEntity<? super PostTodoResponseDto> postTodo(PostTodoRequestDto dto, String email) {
        try{   
            boolean existedEmail = userRepository.existsByEmail(email);
            if(!existedEmail){
                return PostTodoResponseDto.notExistUser();
            }

            TodoEntity todoEntity = new TodoEntity(dto, email);
            todoRepository.save(todoEntity);

        } catch(Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PostTodoResponseDto.success();
    }

    @Override
public ResponseEntity<? super PatchTodoResponseDto> patchTodo(PatchTodoRequestDto dto, Long todoId, String email) {
    try {
        // 1. 존재하는 사용자인지 확인 (생략 가능하지만 보안상 추천)
        boolean hasUser = userRepository.existsByEmail(email);
        if (!hasUser) return PatchTodoResponseDto.notExistUser();

        // 2. 존재하는 투두인지 확인
        TodoEntity todoEntity = todoRepository.findByTodoId(todoId);
        if (todoEntity == null) return PatchTodoResponseDto.notExistTodo();

        // 3. 권한 확인 (작성자 이메일과 로그인한 이메일 비교)
        String writerEmail = todoEntity.getWriterEmail();
        if (!writerEmail.equals(email)) return PatchTodoResponseDto.noPermission();

        // 4. 수정 및 저장
        // (Entity에 patch 메서드를 만들어두면 깔끔합니다. 아래 3번 항목 참고)
        todoEntity.patch(dto);
        todoRepository.save(todoEntity);

        return PatchTodoResponseDto.success();

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseDto.databaseError();
    }
}

    @Override
    public ResponseEntity<? super DeleteTodoResponseDto> deleteTodo(Long todoId, String email) {
        try {
        
        TodoEntity todoEntity = todoRepository.findByTodoId(todoId);
        if (todoEntity == null) return DeleteTodoResponseDto.notExistTodo();

        
        if (!todoEntity.getWriterEmail().equals(email)) {
            return DeleteTodoResponseDto.noPermission();
        }

        todoRepository.delete(todoEntity);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseDto.databaseError();
    }
        return DeleteTodoResponseDto.success();
    }

    
    
}
