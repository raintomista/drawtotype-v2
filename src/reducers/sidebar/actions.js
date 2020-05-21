/* prettier-ignore */

export const addScreen = (state, props) => {
  const screens = state.screens;
  screens.push({
    name: props.screenName,
    collapsed: false,
    components: []
  })

  return {
    ...state,
    screens
  }
}

export const addComponent = (state, props) => {
  const screens = state.screens;
  screens[props.screenIndex].components.push({
    type: props.componentType
  });

  return {
    ...state,
    screens
  }
}

export const setMode = (state, props) => {
  return {
    ...state,
    mode: props.mode
  }
}

export const setScreens = (state, props) => {
  return {
    ...state,
    screens: props.screens
  }
}

export const toggleCollapsed = (state, props) => {
  const screens = state.screens
  screens[props.index].collapsed = !screens[props.index].collapsed

  return {
    ...state,
    screens
  }
}