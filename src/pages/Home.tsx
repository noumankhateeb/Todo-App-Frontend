import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchTodos } from '../redux/todoSlice';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [editTodo, setEditTodo] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      <Navbar />
     
      <div className="home-page">
        
        <AddTodo editTodo={editTodo} setEditTodo={setEditTodo} />
        <TodoList setEditTodo={setEditTodo} />
      </div>
    </>
  );
};

export default Home;
