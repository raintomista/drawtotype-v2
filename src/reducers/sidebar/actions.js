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

export const deleteScreen = (state, action) => {
  const { screens } = state;
  const { screenIndex } = action;

  screens.splice(screenIndex, 1);

  return {
    ...state,
    screens
  }
}

export const duplicateScreen = (state, action) => {
  const { screens } = state
  const { screenIndex } = action

  // Reference the current screen and update collapsed to true
  const screen = screens[screenIndex]
  screen.collapsed = true

  // Clone the current screen and set its collapse to false
  const duplicateScreen =  Object.assign({}, screen)
  duplicateScreen.collapsed = false

  // Insert the duplicate screen after the current screen
  screens.splice(screenIndex + 1, 0, duplicateScreen)

  // Always select the duplicate screen
  // when the action finishes
  return {
    ...state,
    screens,
    selectedScreen: screenIndex + 1,
    selectedComponent: null
  }
}

export const renameScreen = (state, action) => {
  const { screens } = state
  const { screenIndex, screenName } = action

  const screen = screens[screenIndex]
  screen.name = screenName

  return {
    ...state,
    screens
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
    selectedComponentZ: componentIndex
  }
}

export const setMode = (state, action) => {
  const { mode } = action
  return {
    ...state,
    mode: mode
  }
}

export const setModeRenameScreen = (state, action) => {
  const { screenIndex } = action

  return {
    ...state,
    mode: 'rename-screen',
    selectedScreen: screenIndex,
    selectedComponent: null
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