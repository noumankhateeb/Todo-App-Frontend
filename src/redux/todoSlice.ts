import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addTodoCall, fetchTodosCall, deleteTodoCall, updateTodoCall } from '../services/api';

interface Todo {
  _id: string; 
  title: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Thunks for async operations
export const addTodo = createAsyncThunk<Todo, { title: string; text: string; completed: boolean }>(
  'todos/addTodo',
  async (newTodo) => {
    const token = localStorage.getItem('token');
    const response = await addTodoCall('/api/todo', newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as Todo;
  }
);

export const fetchTodos = createAsyncThunk<Todo[]>(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetchTodosCall('/api/todo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Todo[];
    } catch (error) {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);

export const deleteTodo = createAsyncThunk<string, { id: string }>(
  'todos/deleteTodo',
  async ({ id }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      await deleteTodoCall(`/api/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete todo');
    }
  }
);

export const updateTodo = createAsyncThunk<Todo, { id: string; title: string; text: string; completed: boolean }>(
  'todos/updateTodo',
  async ({ id, title, text, completed }, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await updateTodoCall(`/api/todo/${id}`, { title, text, completed }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Todo;
    } catch (error) {
      return rejectWithValue('Failed to update todo');
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add new todo
      .addCase(addTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add todo';
      })

      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = 'succeeded';
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default todoSlice.reducer;
