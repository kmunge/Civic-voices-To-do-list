import { Todo } from '@/models/toDo.model';

const API_URL = 'http://localhost:5001/api/todos';

const fetchConfig = {
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Fetch all todos
export const subscribeTodos = (callback: (todos: Todo[]) => void) => {
  const fetchTodos = async () => {
    try {
      const response = await fetch(API_URL, {
        ...fetchConfig,
        method: 'GET'
      });
      if (!response.ok) throw new Error('Failed to fetch todos');
      const todos = await response.json();
      callback(todos.reverse());
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  };
  fetchTodos();
  return () => {}; // No real-time updates, so return a no-op function
};

// Add a new todo
export const addTodo = async (title: string) => {
  if (!title.trim()) throw new Error("Title cannot be empty");

  const response = await fetch(API_URL, {
    ...fetchConfig,
    method: 'POST',
    body: JSON.stringify({
      title: title.trim(),
      completed: false,
    }),
  });
  
  if (!response.ok) throw new Error('Failed to add todo');
  return await response.json();
};

// Toggle todo completed status
export const toggleTodo = async (id: string, completed: boolean) => {
  const response = await fetch(`${API_URL}/${id}`, {
    ...fetchConfig,
    method: 'PUT',
    body: JSON.stringify({ completed }),
  });
  
  if (!response.ok) throw new Error('Failed to update todo');
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    ...fetchConfig,
    method: 'DELETE',
  });
  
  if (!response.ok) throw new Error('Failed to delete todo');
};