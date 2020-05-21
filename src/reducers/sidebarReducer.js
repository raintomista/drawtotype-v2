const setScreens = (state, {
  screens
}) => {
  return {
    ...state,
    screens
  }
}

const toggleCollapsed = (state, {
  index
}) => {
  const screens = state.screens
  screens[index].collapsed = !screens[index].collapsed
  return {
    ...state,
    screens
  }
}

const addComponent = (state, {
  screenIndex,
  componentType
}) => {
  const screens = state.screens;
  screens[screenIndex].components.push({
    type: componentType
  });

  return {
    ...state,
    screens
  }
}

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_COLLAPSED':
      return toggleCollapsed(state, action);
    case 'SET_SCREENS':
      return setScreens(state, action)
    case 'ADD_COMPONENT':
      return addComponent(state, action)
    default:
      return {
        ...state
      };
  }
};