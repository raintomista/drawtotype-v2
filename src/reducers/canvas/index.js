export const canvasReducer = (state, action) => {
  switch (action.type) {
    case 'CANVAS_ZOOM_IN':
      return {
        ...state,
        zoomLevel: state.zoomLevel + 0.25 < 4.0 ? state.zoomLevel + 0.25 : 4.0
      }
      case 'CANVAS_ZOOM_OUT':
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