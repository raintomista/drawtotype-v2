import * as types from './types'

export const canvasReducer = (state, action) => {
  switch (action.type) {
    case types.CANVAS_SET_ZOOM:
      return {
        ...state,
        zoomLevel: action.zoomLevel
      }
    case types.CANVAS_ZOOM_IN:
      return {
        ...state,
        zoomLevel: state.zoomLevel + 0.25 < 2.0 ? state.zoomLevel + 0.25 : 2.0
      }
      case types.CANVAS_ZOOM_OUT:
        return {
          ...state,
          zoomLevel: state.zoomLevel - 0.25 > 0.5 ? state.zoomLevel - 0.25 : 0.5
        }
      default:
        return {
          ...state
        }
  }
}