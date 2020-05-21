import types from 'reducers/types'

const setMode = (state, {
  mode
}) => {
  return {
    ...state,
    mode: mode
  }
}

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

const addScreen = (state, {
  screenName
}) => {
  const screens = state.screens;
  screens.push({
    name: screenName,
    collapsed: false,
    components: []
  })
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
    case types.SIDEBAR_TOGGLE_COLLAPSED:
      return toggleCollapsed(state, action);
    case types.SIDEBAR_SET_MODE:
      return setMode(state, action);
    case types.SIDEBAR_SET_SCREENS:
      return setScreens(state, action);
    case types.SIDEBAR_ADD_SCREEN:
      return addScreen(state, action);
    case types.SIDEBAR_ADD_COMPONENT:
      return addComponent(state, action);
    default:
      return {
        ...state
      };
  }
};