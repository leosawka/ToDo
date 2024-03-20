import { useState, createContext } from 'react';
import { useLocalStorage } from '../App/useLocalStorage';

const TodoContext = createContext()

function TodoProvider( {children} ) {
  const {
    item: todos, 
    saveItem: setTodos, 
    loading, 
    error,
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { item: darkMode, saveItem: setDarkMode } = useLocalStorage('DARK_MODE', false);
  
  const searchedTodos = todos.filter(todo => {
    return todo.text.toLowerCase().includes(searchValue.toLowerCase());
  })
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  const addTodo = (text) => {
  const newTodos = [...todos];
  newTodos.push({
    text,
    completed: false,
    date: new Date().toISOString(),
  });
  setTodos(newTodos);
};

  function getGroupName(date) {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart).setDate(todayStart.getDate() - 1);
    const last7DaysStart = new Date(todayStart).setDate(todayStart.getDate() - 7);
    const last30DaysStart = new Date(todayStart).setDate(todayStart.getDate() - 30);
    const thisYearStart = new Date(now.getFullYear(), 0, 1);
  
    if (date >= todayStart) {
      return 'Today';
    } else if (date >= yesterdayStart) {
      return 'Yesterday';
    } else if (date >= last7DaysStart) {
      return 'Last 7 Days';
    } else if (date >= last30DaysStart) {
      return 'Last 30 Days';
    } else if (date >= thisYearStart) {
      return 'This Year';
    } else {
      return date.getFullYear().toString();
    }
  }
  
  const groupTodosByDate = (todos) => {
    const groups = todos.reduce((acc, todo) => {
      const todoDate = new Date(todo.date);
  
      if (isNaN(todoDate.getTime())) {
        return acc;
      }
  
      const groupName = getGroupName(todoDate);
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(todo);
      return acc;
    }, {});
  
    return groups;
  };
  
  
  const groupedTodos = groupTodosByDate(todos);

  const entireTodo = (index) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === index);
    if (todoIndex !== -1) {
      newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
      setTodos(newTodos);
    }
  }
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === index);
    if (todoIndex !== -1) {
      newTodos.splice(todoIndex, 1);
      setTodos(newTodos);
    }
  }
  return(
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      entireTodo,
      addTodo,
      deleteTodo,
      darkMode,
      setDarkMode,
      openModal,
      setOpenModal,
      groupedTodos
    }}>
      { children }
    </TodoContext.Provider>
  )
}

export { TodoContext, TodoProvider}