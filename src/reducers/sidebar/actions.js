import { cloneDeep } from 'lodash';
import { ImageFactory } from 'utils/componentFactory'

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
  const { screens } = state;
  const { screenIndex, componentType } = action;

  let component, screen;

  /* Generate a new component based on its type */
  switch(componentType) {
    case 'Image':
      component = new ImageFactory()
      break;
  }

  /* Get the reference to the current screen and 
    uncollapse it before adding the new component */
  screen = screens[screenIndex]
  screen.collapsed = false
  screen.components.push(component)

  /* Always select the newly created component */
  const selectedScreen = screenIndex
  const selectedComponent = screen.components.length - 1

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

export const deleteComponent = (state, action) => {
  const { screens } = state;
  const { componentIndex, screenIndex } = action;

  // Get the reference to the selected screen
  const screen = screens[screenIndex]

  // Update the remove the selected component from its components
  screen.components.splice(componentIndex, 1);

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

export const duplicateComponent = (state, action) => {
  const { screens } = state
  const { componentIndex, screenIndex } = action

  const screen = screens[screenIndex]
  const component = screen.components[componentIndex]

  const duplicateComponent = cloneDeep(component)
  screen.components.splice(componentIndex + 1, 0, duplicateComponent)

  return {
    ...state,
    screens,
    selectedScreen: screenIndex,
    selectedComponent: componentIndex + 1
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

export const renameComponent = (state, action) => {
  const { screens } = state
  const { screenIndex } = action
  const { componentName, componentIndex } = action

  /* Get the reference to the current screen and current component.
    Then, update the component name */
  const screen = screens[screenIndex]
  const component = screen.components[componentIndex]
  component.name = componentName

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

export const setModeRenameScreen = (state, action) => {
  const { screenIndex } = action

  return {
    ...state,
    mode: 'rename-screen',
    selectedScreen: screenIndex,
    selectedComponent: null
  }
}

export const setModeRenameComponent = (state, action) => {
  const { screenIndex, componentIndex } = action

  return {
    ...state,
    mode: 'rename-component',
    selectedScreen: screenIndex,
    selectedComponent: componentIndex
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