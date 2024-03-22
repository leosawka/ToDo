import { useContext } from "react";
import { TodoContext } from "./Context";
import { TodoItem } from "./TodoItem";

const titleStyle = {
  color: "#A0A0A0",
  textAlign: "left",
  fontFamily: 'Roboto, sans-serif',
  fontWeight: "italic light",
  borderBottom: "1px solid lightgray",
};

const dark = {
  color: "white",
  textAlign: "left",
  fontFamily: 'Roboto, sans-serif',
  fontWeight: "italic light",
  borderBottom: "1px solid lightgray",
};


function TodoGroups({ groups }) {
  const { darkMode, entireTodo, deleteTodo } = useContext(TodoContext)
  return (
    <div className="TodoGroups">
      {Object.entries(groups).map(([groupTitle, todos]) => (
        <div key={groupTitle}>
          <p style={darkMode ? dark : titleStyle}>{groupTitle}</p>
          {todos.map((todo) => (
            <TodoItem 
              text={todo.text}
              completed={todo.completed}
              onComplete={() => entireTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
              creationDate={todo.date}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export { TodoGroups };
