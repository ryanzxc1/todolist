import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todoApi';
import { Todo } from '../types/todo.types';
import TodoItem from '../components/TodoItem';

const TodoPage: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoContent, setNewTodoContent] = useState('');
  const [newTodoDueDate, setNewTodoDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedToken = localStorage.getItem('token');
    
    if (!storedEmail || !storedToken) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    
    setEmail(storedEmail);
  }, [navigate]);

  useEffect(() => {
    if (email) {
      fetchTodos();
    }
  }, [email]);

  const fetchTodos = async () => {
    if (!email) return;
    
    try {
      const response = await todoApi.getTodos(email);
      console.log('Todos response:', response);
      setTodos(response.todoList || []);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim() || !newTodoContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      await todoApi.createTodo({ 
        title: newTodoTitle, 
        content: newTodoContent,
        dueDate: newTodoDueDate || undefined
      });
      setNewTodoTitle('');
      setNewTodoContent('');
      setNewTodoDueDate('');
      await fetchTodos();
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('할 일 추가에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (
    todoId: number, 
    title: string, 
    content: string, 
    dueDate: string,
    isCompleted: boolean
  ) => {
    try {
      await todoApi.updateTodo(todoId, { title, content, dueDate, isCompleted });
      await fetchTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
      alert('할 일 수정에 실패했습니다.');
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await todoApi.deleteTodo(todoId);
      await fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
      alert('할 일 삭제에 실패했습니다.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📝 Todo List</h1>
        <div style={styles.userInfo}>
          <span style={styles.email}>{email}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            로그아웃
          </button>
        </div>
      </div>

      <form onSubmit={handleCreateTodo} style={styles.form}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            style={styles.inputTitle}
          />
          <input
            type="text"
            value={newTodoContent}
            onChange={(e) => setNewTodoContent(e.target.value)}
            placeholder="내용을 입력하세요"
            style={styles.inputContent}
          />
          <input
            type="date"
            value={newTodoDueDate}
            onChange={(e) => setNewTodoDueDate(e.target.value)}
            style={styles.inputDate}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.addButton}>
          {loading ? '추가중...' : '추가'}
        </button>
      </form>

      <div style={styles.todoList}>
        {todos.length === 0 ? (
          <p style={styles.emptyMessage}>할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.todoId}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  email: {
    color: '#666',
    fontSize: '14px',
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    alignItems: 'flex-start',
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  inputTitle: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
  },
  inputContent: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
  },
  inputDate: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    cursor: 'pointer',
  },
  addButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    alignSelf: 'stretch',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
  },
};

export default TodoPage;