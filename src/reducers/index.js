import {
  sidebarReducer
} from 'reducers/sidebar';

export const mainReducer = ({
  sidebar
}, action) => ({
  sidebar: sidebarReducer(sidebar, action),
});