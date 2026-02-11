import React, { useState } from 'react';
import { Todo } from '../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todoId: number, title: string, content: string, dueDate: string, isCompleted: boolean) => void;
  onDelete: (todoId: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editContent, setEditContent] = useState(todo.content);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleUpdate = () => {
    if (editTitle.trim() && editContent.trim()) {
      onUpdate(todo.todoId, editTitle, editContent, editDueDate, todo.isCompleted);
      setIsEditing(false);
    }
  };

  const handleToggleComplete = () => {
    console.log('Before toggle - isCompleted:', todo.isCompleted); // 디버깅용
    console.log('After toggle - will be:', !todo.isCompleted); // 디버깅용
    onUpdate(todo.todoId, todo.title, todo.content, todo.dueDate || '', !todo.isCompleted);
  };

  return (
    <div style={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={handleToggleComplete}
        style={styles.checkbox}
      />
      
      {isEditing ? (
        <div style={styles.editContainer}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="제목"
            style={styles.inputTitle}
            autoFocus
          />
          <input
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="내용"
            style={styles.inputContent}
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            style={styles.inputDate}
          />
        </div>
      ) : (
        <div style={styles.contentContainer}>
          <span
            style={{
              ...styles.title,
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              color: todo.isCompleted ? '#999' : '#333',
            }}
          >
            {todo.title}
          </span>
          <span
            style={{
              ...styles.content,
              textDecoration: todo.isCompleted ? 'line-through' : 'none',
              color: todo.isCompleted ? '#999' : '#666',
            }}
          >
            {todo.content}
          </span>
          {todo.dueDate && (
            <span style={styles.dueDate}>📅 {todo.dueDate}</span>
          )}
        </div>
      )}

      <div style={styles.buttonGroup}>
        {isEditing ? (
          <>
            <button onClick={handleUpdate} style={styles.saveButton}>
              저장
            </button>
            <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>
              취소
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>
              수정
            </button>
            <button onClick={() => onDelete(todo.todoId)} style={styles.deleteButton}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '12px',
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  editContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  content: {
    fontSize: '14px',
  },
  dueDate: {
    fontSize: '12px',
    color: '#ff9800',
  },
  inputTitle: {
    padding: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  inputContent: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  inputDate: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  saveButton: {
    padding: '6px 12px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelButton: {
    padding: '6px 12px',
    backgroundColor: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TodoItem;