import React, { createContext, useReducer } from 'react';
import { toggleReducer } from 'reducers/index';

const initialState = { toggle: false };

const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ toggle }, action) => ({
  toggle: toggleReducer(toggle, action),
});
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    mainReducer,
    initialState
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
