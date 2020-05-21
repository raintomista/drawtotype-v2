import {
  sidebarReducer
} from 'reducers/sidebarReducer';

export const mainReducer = ({
  sidebar
}, action) => ({
  sidebar: sidebarReducer(sidebar, action),
});