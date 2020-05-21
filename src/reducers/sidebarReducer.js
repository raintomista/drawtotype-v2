const toggleHeader = (state, index) => {
  const headerCollapsed = state.headerCollapsed;
  headerCollapsed[index] = !headerCollapsed[index]
  return {
    ...state,
    headerCollapsed
  }
}

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_HEADER':
      return toggleHeader(state, action.index);
    default:
      return {
        ...state
      };
  }
};