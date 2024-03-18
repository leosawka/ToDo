import { useContext } from 'react';
import { TodoCounter } from '../Components/TodoCounter';
import { TodoSearch } from '../Components/TodoSearch';
import { TodoList } from '../Components/TodoList';
import { TodoItem } from '../Components/TodoItem';
import { CreateTodoButton } from '../Components/CreateTodoButton';
import { EmptyTodos } from '../Components/EmptyTodos';
import { SearchNotMatch } from '../Components/SearchNotMatch';
import { TodosLoading } from '../Components/TodosLoading';
import { TodosError } from '../Components/TodosError';
import { TodoContext } from '../Components/Context';
import { TodoForm } from '../Components/TodoForm';
import { Modal } from '../Components/Modal';
import '../Styles/App.css';

function App() {
  // Using the useContext hook to access the state and functions provided by TodoContext.
  const {loading,
    error,
    searchedTodos,
    entireTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    searchValue,
  } = useContext(TodoContext)

  return (
    <>
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
        {searchedTodos.map((todo, index) => ( /* Iteration over searchedTodos to create TodoItem components */
          <TodoItem 
            key={index} 
            text={todo.text} 
            completed={todo.completed}
            onComplete={() => entireTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton openModal={openModal} setOpenModal={setOpenModal}/> {/* Button to create new todos */}
      {openModal && ( /* Conditional rendering for modal component */
        <Modal>
          <TodoForm/> {/* Form inside the modal for creating todos */}
        </Modal>
      )}
    </>
  );
}

export default App;
