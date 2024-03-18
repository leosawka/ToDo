import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App/App';
import { TodoProvider } from './Components/Context';

// This is the entry point of the React application.
// Here we import the necessary modules and styles, create a root, 
// and render the App component within the TodoProvider context.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoProvider> {/* The TodoProvider provides a context for the entire application */}
    <App />
  </TodoProvider>
);
