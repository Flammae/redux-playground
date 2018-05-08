import store from "./store";
import { pipe, renderInside } from "./utils";

// get dom references
const todoContainer = document.querySelector("#ul");
const addButton = document.querySelector("button");
const input = document.querySelector("input");
const radios = document.querySelectorAll("input[type=radio]");

// functions to modify todo state and render html
const applyFilters = ({ todos, filter }) => {
  if (filter === "SHOW_COMPLITED")
    return todos.filter(todo => todo.complited === false);
  if (filter === "SHOW_UNFINISHED")
    return todos.filter(todo => todo.complited === true);
  return todos;
};

const makeHtml = filteredTodos => {
  return filteredTodos
    .map(
      todo =>
        `
        <li 
          data-index="${todo.index}"
          style=${todo.complited && "text-decoration:line-through"}
        >
          <input 
            type="checkbox" 
            class="checkbox" 
            ${todo.complited && "checked"}
          />
          ${todo.text}
          <span 
            class="remove" 
            style="margin-left:40px;color:red"
          >X</span>
        </li> 
        `
    )
    .join();
};

// compose todo modification and render functions into one function;
// call it initialy and subscribe to store changes;
const renderTodos = pipe(applyFilters, makeHtml, renderInside(todoContainer));
renderTodos(store.getState());
store.subscribe(renderTodos);

// add event listeners
todoContainer.addEventListener("click", e => {
  if (e.target.className === "remove") {
    store.dispatch({
      type: "REMOVE",
      index: e.target.parentNode.dataset.index
    });
  }

  if (e.target.className === "checkbox") {
    store.dispatch({
      type: "TOGGLE",
      index: e.target.parentNode.dataset.index
    });
  }
});

addButton.addEventListener("click", () => {
  store.dispatch({
    type: "ADD",
    todo: {
      text: input.value,
      index: store.getState().todos.length,
      complited: false
    }
  });
});

for (let r of radios) {
  r.addEventListener("click", e => {
    store.dispatch({
      type: "SET_VISIBILITY_FILTER",
      filter: e.target.value
    });
  });
}
