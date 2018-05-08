const initialTodos = [
  { index: 0, text: "learn redux", complited: true },
  { index: 1, text: "use node backend and react together", complited: false }
];

export const todoReducer = (state = initialTodos, action) => {
  switch (action.type) {
    case "ADD":
      return [action.todo, ...state];
    case "REMOVE":
      return state.filter(item => item.index != action.index);
    case "TOGGLE":
      return state.map(item => {
        if (item.index == action.index) {
          return { ...item, complited: !item.complited };
        }
        return item;
      });
    default:
      return state;
  }
};

export const filterReducer = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};
