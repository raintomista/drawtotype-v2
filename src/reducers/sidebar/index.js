import types from 'reducers/types'
import {
  addComponent,
  addScreen,
  setMode,
  setScreens,
  toggleCollapsed
} from 'reducers/sidebar/actions'

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case types.SIDEBAR_ADD_COMPONENT:
      return addComponent(state, action);
    case types.SIDEBAR_ADD_SCREEN:
      return addScreen(state, action);
    case types.SIDEBAR_SET_MODE:
      return setMode(state, action);
    case types.SIDEBAR_SET_SCREENS:
      return setScreens(state, action);
    case types.SIDEBAR_TOGGLE_COLLAPSED:
      return toggleCollapsed(state, action);
    default:
      return {
        ...state
      };
  }
};