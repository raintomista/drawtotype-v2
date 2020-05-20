export const toggleReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state;
  }
};
