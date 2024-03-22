import { TodoContext } from '../Components/Context';
import '../Styles/TodoItem.css';

function TodoItem({ text, completed, onComplete, onDelete, creationDate , darkMode }) {
  const formattedDate = new Date(creationDate).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  return(
    <li className={`TodoItem ${darkMode ? 'DarkMode' : ''}`} title={`Created on: ${formattedDate}`}>
      <span 
        className={`Icon Icon-check ${completed && 'Icon-check--active'} ${darkMode}`}
        onClick={onComplete}
      >
        {completed ? "✓" : "○"}
      </span>
      <p className={`TodoItem-p ${completed && 'TodoItem-p--complete'}`}>{text}</p>
      <span 
        className={`Icon Icon-delete ${darkMode ? 'DarkMode--close' : ''}`}	
        onClick={onDelete}
      >{`✗`}</span>
    </li>
  );
}

export { TodoItem };