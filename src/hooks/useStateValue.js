import {
  useContext
} from 'react';
import {
  StateContext
} from 'state';

export const useStateValue = () => useContext(StateContext);