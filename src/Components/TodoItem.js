import { useContext } from 'react';
import { TodoContext } from './Context';
import '../Styles/TodoItem.css';

function TodoItem({key, text, completed, onComplete, onDelete}) {
  const {
    darkMode,
  } = useContext(TodoContext)
  return(
    <li className={`TodoItem ${darkMode? 'DarkMode' : ''}`}>
      <span 
        className={`Icon Icon-check ${completed && 'Icon-check--active'} ${darkMode}`}
        onClick={onComplete}
      >
        {completed?"✓":"○"}
      </span>
      <p className={`TodoItem-p ${completed && 'TodoItem-p--complete'}`}>{text}</p>
      <span 
        className={`Icon Icon-delete ${darkMode? 'DarkMode--close' : ''}`}	
        onClick={onDelete}
      >{`✗`}</span>
    </li>
  )
}

export {TodoItem};