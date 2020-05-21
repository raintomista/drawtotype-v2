import {
  canvasReducer
} from 'reducers/canvas'
import {
  sidebarReducer
} from 'reducers/sidebar';

export const mainReducer = ({
  canvas,
  sidebar
}, action) => ({
  canvas: canvasReducer(canvas, action),
  sidebar: sidebarReducer(sidebar, action),
});