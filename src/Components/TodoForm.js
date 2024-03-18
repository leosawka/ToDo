import { useState, useContext } from 'react';
import { TodoContext } from '../Components/Context';
import '../Styles/TodoForm.css'; 

function TodoForm() {
  const [newTodoValue, setNewTodoValue] = useState('');

  const {addTodo, setOpenModal, darkMode} = useContext(TodoContext)

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue)
    setOpenModal(false);
  }

  const onCancel = (event) => {
    event.preventDefault();
    setOpenModal(false);
  }

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  }

  const onKeyPress = (event) => {
    if(event.key === 'Enter' && !event.shiftkey) {
      event.preventDefault();
      addTodo(newTodoValue);
      setOpenModal(false);
    }
  }

  return (
    <form style={{backgroundColor: darkMode ? '#5A5A5A' : 'white'}} onSubmit={onSubmit}>
      <label style={{color: darkMode ? 'white' : 'black'}}>Write a new ToDo</label>
      <textarea placeholder='text' value={newTodoValue} onChange={onChange} onKeyDown={onKeyPress}/>
      <div className={`TodoForm-buttonContainer $`}>
        <button type='submit' className='TodoForm-button TodoForm-button--add'>Add</button>
        <button type='button' className='TodoForm-button TodoForm-button--cancel' onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export { TodoForm };