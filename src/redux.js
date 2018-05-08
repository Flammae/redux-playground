export const createStore = reducer => {
  let state;
  let listeners = [];

  const subscribe = listener => {
    listeners.push(listener);
  };

  const dispatch = action => {
    state = reducer(state, action);
    for (let l of listeners) {
      l(state);
    }
  };

  const getState = () => state;

  // to get initial state
  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
};

export const combineReducers = reducers => (state = {}, action) => {
  const keys = Object.keys(reducers);
  const reducersObj = keys.reduce((obj, key) => {
    obj[key] = reducers[key](state[key], action);
    return obj;
  }, {});
  return reducersObj;
};
