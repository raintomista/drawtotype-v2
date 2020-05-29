import * as types from 'reducers/sidebar/types'
import {
  addScreen,
  addComponent,
  deleteScreen,
  deleteComponent,
  duplicateScreen,
  duplicateComponent,
  renameScreen,
  renameComponent,
  selectScreen,
  selectComponent,
  setComponentPosition,
  setMode,
  setModeRenameScreen,
  setModeRenameComponent,
  setScreens,
  toggleCollapsed
} from 'reducers/sidebar/actions'

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case types.SIDEBAR_ADD_SCREEN:
      return addScreen(state, action);
    case types.SIDEBAR_ADD_COMPONENT:
      return addComponent(state, action);
    case types.SIDEBAR_DELETE_SCREEN:
      return deleteScreen(state, action);
    case types.SIDEBAR_DELETE_COMPONENT:
      return deleteComponent(state, action);
    case types.SIDEBAR_DUPLICATE_SCREEN:
      return duplicateScreen(state, action);
    case types.SIDEBAR_DUPLICATE_COMPONENT:
      return duplicateComponent(state,action)
    case types.SIDEBAR_RENAME_SCREEN:
      return renameScreen(state, action);
    case types.SIDEBAR_RENAME_COMPONENT:
      return renameComponent(state, action)
    case types.SIDEBAR_SELECT_SCREEN:
      return selectScreen(state, action);
    case types.SIDEBAR_SELECT_COMPONENT:
      return selectComponent(state, action);
    case types.SIDEBAR_SET_COMPONENT_POSITION:
      return setComponentPosition(state, action);
    case types.SIDEBAR_SET_MODE:
      return setMode(state, action);
    case types.SIDEBAR_SET_MODE_RENAME_SCREEN:
      return setModeRenameScreen(state, action);
    case types.SIDEBAR_SET_MODE_RENAME_COMPONENT:
      return setModeRenameComponent(state, action);
    case types.SIDEBAR_SET_SCREENS:
      return setScreens(state, action);
    case types.SIDEBAR_TOGGLE_COLLAPSED:
      return toggleCollapsed(state, action);
    default:
      return ({
        ...state
      });
  }
};