import { canvasReducer } from 'reducers/canvas'
import { inspectorReducer } from 'reducers/inspector'
import { sidebarReducer } from 'reducers/sidebar';
import { toolbarReducer } from 'reducers/toolbar';


export const mainReducer = ({ canvas, inspector, sidebar, toolbar }, action) => {
  const state = {
    canvas: canvasReducer(canvas, action),
    inspector: inspectorReducer(inspector, action),
    sidebar: sidebarReducer(sidebar, action),
    toolbar: toolbarReducer(toolbar, action)
  }

  localStorage.setItem('app-state', JSON.stringify(state))
  
  return state
}
