import { useContext } from 'react';
import { StateContext } from 'state';

export const useStateValue = () => useContext(StateContext);

export const useSidebarState = () => {
  const { state, dispatch } = useStateValue()
  const { screens } = state.sidebar
  
  let screen, screenIndex, component, components, componentIndex
  screenIndex = state.sidebar.selectedScreen
  componentIndex = state.sidebar.selectedComponent

  if (screenIndex !== null && componentIndex !== null) {
    screen = screens[screenIndex]
    components = screen.components
    component = screen.components[componentIndex]
  }

  return ({
    component,
    components,
    componentIndex,
    dispatch,
    screen,
    screens,
    screenIndex,
  })
}

