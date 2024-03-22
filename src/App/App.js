import { useContext, useEffect } from 'react';
import { TodoCounter } from '../Components/TodoCounter';
import { TodoSearch } from '../Components/TodoSearch';
import { TodoList } from '../Components/TodoList';
import { CreateTodoButton } from '../Components/CreateTodoButton';
import { EmptyTodos } from '../Components/EmptyTodos';
import { SearchNotMatch } from '../Components/SearchNotMatch';
import { TodosLoading } from '../Components/TodosLoading';
import { TodosError } from '../Components/TodosError';
import { TodoContext } from '../Components/Context';
import { TodoForm } from '../Components/TodoForm';
import { TodoGroups } from '../Components/TodoGroups';
import { Modal } from '../Components/Modal';
import '../Styles/App.css';

function App() {
  // Using the useContext hook to access the state and functions provided by TodoContext.
  const {loading,
    error,
    searchedTodos,
    openModal,
    setOpenModal,
    searchValue,
    darkMode,
    setDarkMode,
    groupedTodos
  } = useContext(TodoContext)

  useEffect(() => {
    darkMode?document.body.classList.add('Dark-mode'):document.body.classList.remove('Dark-mode');

    return () => {document.body.classList.remove('Dark-mode');}
  }, [darkMode])

  const handleToggleDarkMode = () => setDarkMode(!darkMode)

  return (
    <div className={`App`}>
      <div className='switch-div'>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={darkMode}
            onChange={handleToggleDarkMode} 
          />
          <span className="slider round"></span>
        </label>
        <p className='switch-text'>Dark Mode</p>
      </div>
      <TodoCounter/>
      <TodoSearch/>
      <TodoList>
        {loading && 
          <>
            <TodosLoading/>
            <TodosLoading/>
            <TodosLoading/>
          </>
        }
        {error && <TodosError/>}
        {!loading && !searchValue && searchedTodos.length === 0 && <EmptyTodos/>}
        {!loading && searchValue && searchedTodos.length === 0 && (
          <SearchNotMatch/>
        )}
        <TodoGroups groups={groupedTodos}/>
      </TodoList>
      <CreateTodoButton openModal={openModal} setOpenModal={setOpenModal}/> {/* Button to create new todos */}
      {openModal && ( /* Conditional rendering for modal component */
        <Modal>
          <TodoForm/> {/* Form inside the modal for creating todos */}
        </Modal>
      )}
    </div>
  );
}

export default App;
