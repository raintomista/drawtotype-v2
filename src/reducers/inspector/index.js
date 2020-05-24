import * as types from './types'

export const inspectorReducer = (state, action) => {
  switch(action.type) {
    case types.INSPECTOR_SET_POSITION:
      return {
        ...state,
        posX: action.posX,
        posY: action.posY
      }
    case types.INSPECTOR_SET_POSITION_X:
      return {
        ...state,
        posX: action.posX,
      }
    case types.INSPECTOR_SET_POSITION_Y:
      return {
        ...state,
        posY: action.posY,
      }
    case types.INSPECTOR_SET_DIMENSION:
      return {
        ...state,
        height: action.height,
        width: action.width
      }
    default:
      return {
        ...state
      }
  }
}