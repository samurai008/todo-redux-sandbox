import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "./styles.css";

const todo = (todo, action) => {
  switch (action.type) {
    case "TOGGLE_TODO":
      if (todo.id !== action.id) {
        return todo;
      }
      return {
        ...todo,
        completed: !todo.completed
      };
    default:
      return todo;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    visiblityFilter: visibilityFilter(state.visiblityFilter, action)
  };
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.todo];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const store = createStore(todoApp);

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    item: "do something",
    completed: false
  }
});

console.log("State after adding a todo");
console.log(store.getState());
console.log();

store.dispatch({
  type: "TOGGLE_TODO",
  id: 0
});

console.log("State after toggling todo 0");
console.log(store.getState());
console.log();

store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "SHOW_COMPLETED"
});

console.log("State after toggling todo 0");
console.log(store.getState());
console.log();

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
