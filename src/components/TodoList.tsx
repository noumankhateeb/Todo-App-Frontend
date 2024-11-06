import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deleteTodo } from '../redux/todoSlice';
import '../styles/TodoList.scss';

interface TodoListProps {
  setEditTodo: React.Dispatch<React.SetStateAction<any | null>>;
}

const TodoList: React.FC<TodoListProps> = ({ setEditTodo }) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const handleEdit = (todo: any) => {
    console.log('asdasd', todo)
    setEditTodo(todo);
  };

  return (
    <div className='todo-list-card'>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Text</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: any) => (
            <tr key={todo._id}>
              <td>{todo.title}</td>
              <td>{todo.text}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>
                <button className='todo-list-button' onClick={() => handleEdit(todo)}>Edit</button>
                <button className='todo-list-button' onClick={() => handleDelete(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
