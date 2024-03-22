import { useState, useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../Components/Context';
import '../Styles/TodoForm.css'; 

function TodoForm() {
  const {addTodo, setOpenModal, todos, darkMode} = useContext(TodoContext)
  const [newTodoValue, setNewTodoValue] = useState('');

  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const isDuplicate = todos.some(todo => todo.text === newTodoValue.trim());
    if (!newTodoValue.trim()) {
      alert("Please enter a non-empty todo.");
      return;
    }
    if (isDuplicate) {
      const isConfirmed = window.confirm("This todo already exists. Do you want to add it again?");
      if (!isConfirmed) return;
    }
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  const onCancel = (event) => {
    setOpenModal(false);
  }

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onSubmit(event);
    } else if (event.key === 'Escape' && !event.shiftKey) {
      console.log(`event.key ${event.key}`);
      onCancel();
    }
  };

  return (
    <form style={{backgroundColor: darkMode ? '#5A5A5A' : 'white'}} onSubmit={onSubmit}>
      <label style={{color: darkMode ? 'white' : 'black'}}>Write a new ToDo</label>
      <textarea placeholder='text' ref={textAreaRef} value={newTodoValue} onChange={onChange} onKeyDown={onKeyPress}/>
      <div className={`TodoForm-buttonContainer $`}>
        <button type='submit' className='TodoForm-button TodoForm-button--add'>Add</button>
        <button type='button' className='TodoForm-button TodoForm-button--cancel' onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export { TodoForm };