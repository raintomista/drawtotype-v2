import { canvasReducer } from 'reducers/canvas'
import { sidebarReducer } from 'reducers/sidebar';
import { toolbarReducer } from 'reducers/toolbar';

export const mainReducer = ({ canvas, sidebar, toolbar }, action) => ({
  canvas: canvasReducer(canvas, action),
  sidebar: sidebarReducer(sidebar, action),
  toolbar: toolbarReducer(toolbar, action)
});
