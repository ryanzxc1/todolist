package com.example.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.back.entity.TodoEntity;

@Repository
public interface TodoRepository extends JpaRepository<TodoEntity, Long>{
    
    List<TodoEntity> findByWriterEmailOrderByTodoIdDesc(String writerEmail);
    TodoEntity findByTodoId(Long todoId);
}
