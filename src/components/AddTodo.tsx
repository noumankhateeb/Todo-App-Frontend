import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addTodo, updateTodo } from '../redux/todoSlice';
import '../styles/AddTodo.scss'

interface AddTodoProps {
  editTodo: any | null;
  setEditTodo: React.Dispatch<React.SetStateAction<any | null>>;
}

const AddTodo: React.FC<AddTodoProps> = ({ editTodo, setEditTodo }) => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoText, setTodoText] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (editTodo) {
      setTodoTitle(editTodo.title);
      setTodoText(editTodo.text);
      setCompleted(editTodo.completed);
    }
  }, [editTodo]);

  console.log('edit todo', editTodo)

  const handleSubmit = () => {
    if (todoTitle.trim() && todoText.trim()) {
      if (editTodo) {
        console.log('i hit  edit')
        dispatch(updateTodo({
          id: editTodo._id,
          title: todoTitle,
          text: todoText,
          completed: completed,
        }));
        setEditTodo(null);
      } else {
        console.log('i hit  add')
        dispatch(addTodo({
          title: todoTitle,
          text: todoText,
          completed: completed,
        }));
      }

      setTodoTitle('');
      setTodoText('');
      setCompleted(false);
    }
  };

  return (
    <div className='add-todo-card'>
      <h2>Add New To Do</h2>
      <div className='form-data'>
        <input
          type="text"
          placeholder="Title"
          value={todoTitle}
          className="form-input"
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Text"
          className="form-input"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <div>
          <label>
            Completed
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted((prev) => !prev)}
            />
          </label>
        </div>
        <button className='add-todo-button' onClick={handleSubmit}>{editTodo ? 'Update Todo' : 'Add Todo'}</button>
      </div>
    </div>
  );
};

export default AddTodo;
