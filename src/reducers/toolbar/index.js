import * as types from './types'

export const toolbarReducer = (state, action) => {
  switch (action.type) {
    case types.TOOLBAR_SET_TOOL:
      return {
        ...state,
        currentTool: action.currentTool
      };
    default:
      return {
        ...state
      };
  }
}