import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/core';
import { useStateValue } from 'hooks/useStateValue';
import types from 'reducers/types';

export const HeaderInput = ({ inline = true }) => {
  const { state, dispatch } = useStateValue();
  const { mode, selectedScreen, screens } = state.sidebar;
  const [ screenName, setScreenName ] = useState(getDefaultValue());
  const [ discard, setDiscard ] = useState(false);
  const inputRef = useRef()

  useEffect(() => {
    if (mode === 'rename-screen') {
      inputRef.current.select()
    }
  }, [])

  const addScreen = (screenName) => {
    dispatch({
      type: types.SIDEBAR_ADD_SCREEN,
      screenName: screenName
    });
  }

  const renameScreen = (screenName) => {
    dispatch({
      type: types.SIDEBAR_RENAME_SCREEN,
      screenName: screenName,
      screenIndex: selectedScreen
    });
  }

  /* Uses the normal function syntax so that
    it can be hoisted back to the top */
  function getDefaultValue() {
    if (mode === 'add-screen') {
      return ''
    } else if (mode === 'rename-screen') {
      return screens[selectedScreen].name
    }
  }

  const handleBlur = event => { 
    const screenName = event.target.value.trim();

    if (screenName.length > 0 && !discard) {
      if (mode === 'add-screen') {
        addScreen(screenName)
      } else if (mode === 'rename-screen' && !discard){
        renameScreen(screenName)
      }
    }
    
    event.target.value = ''

    dispatch({
      type: types.SIDEBAR_SET_MODE,
      mode: 'view-only'
    })
  }

  const handleChange = event => {
    setScreenName(event.target.value)
  }
  
  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      inputRef.current.blur()
    } else if (event.keyCode === 27){
      setDiscard(true)
      inputRef.current.blur()
    }
  }

  const Header___Input = css`
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    padding: ${inline
      ? '12px 0px'
      : '12px 52px'
    };
    width: 100%;
    &::selection {
      background-color: #ffffff;
    }
  `

  return (
    <input
      ref={inputRef}
      autoFocus={true}
      css={Header___Input}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={screenName}
      type="text"
    />
  )
}

export default HeaderInput