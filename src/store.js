import { todoReducer, filterReducer } from "./reducers";
import { combineReducers, createStore } from "./redux";

// const todoApp = (state = {}, action) => ({
//   todos: todoReducer(state.todos, action),
//   filter: filterReducer(state.filter, action)
// });

const todoApp = combineReducers({
  todos: todoReducer,
  filter: filterReducer
});

export default createStore(todoApp);
