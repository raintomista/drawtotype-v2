export const addScreen = (state, action) => {
  const { screens } = state
  const { screenName } = action

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

export const addComponent = (state, action) => {
  const { screens } = state
  const { screenIndex, componentType } = action

  screens[screenIndex].collapsed = false
  screens[screenIndex].components.push({
    type: componentType
  });

  const selectedScreen = screenIndex
  const selectedComponent = screens[screenIndex].components.length - 1


  return {
    ...state,
    selectedScreen: selectedScreen,
    selectedComponent: selectedComponent,
    screens
  }
}

export const duplicateScreen = (state, action) => {
  const { screens } = state
  const { screenIndex } = action
  const screen = screens[screenIndex]
  screens.splice(screenIndex, 0, screen)

  return {
    ...state,
    screens,
    selectedScreen: screenIndex + 1,
    selectedComponent: null
  }
}

export const selectScreen = (state, action) => {
  const { screenIndex } = action
  
  return {
    ...state,
    selectedScreen: screenIndex,
    selectedComponent: null
  }
}

export const selectComponent = (state, action) => {
  const { screenIndex, componentIndex } = action

  return {
    ...state,
    selectedScreen: screenIndex,
    selectedComponent: componentIndex
  }
}

export const setMode = (state, action) => {
  const { mode } = action
  return {
    ...state,
    mode: mode
  }
}

export const setScreens = (state, action) => {
  const { screens } = action

  return {
    ...state,
    screens: screens
  }
}

export const toggleCollapsed = (state, action) => {
  const { screens } = state
  const { screenIndex } = action

  screens[screenIndex].collapsed = !screens[screenIndex].collapsed

  return {
    ...state,
    screens
  }
}