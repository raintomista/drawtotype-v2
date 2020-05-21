const setScreens = (state, screens) => {
  return {
    ...state,
    screens
  }
}

const toggleCollapsed = (state, index) => {
  const screens = state.screens
  screens[index].collapsed = !screens[index].collapsed
  return {
    ...state,
    screens
  }
}

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_COLLAPSED':
      return toggleCollapsed(state, action.index);
    case 'SET_SCREENS':
      return setScreens(state, action.screens)
    default:
      return {
        ...state
      };
  }
};