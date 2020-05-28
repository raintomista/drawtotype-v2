import React, { useEffect , useRef, useState } from 'react'
import { useStateValue } from 'hooks/useStateValue'
import { css } from '@emotion/core'
import types from 'reducers/types'

const Item__Input = css`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  &::selection {
    background-color: #ffffff;
  }
`

const ItemInput = () => {
  const { state, dispatch } = useStateValue();
  const { mode, screens } = state.sidebar;
  const { selectedScreen, selectedComponent } = state.sidebar;
  const [ componentName, setComponentName ] = useState(getDefaultValue());
  const [ discard, setDiscard ] = useState(false);
  const inputRef = useRef();

  function getDefaultValue() {
    const screen = screens[selectedScreen];
    const component = screen.components[selectedComponent];
    return component.name;
  }

  const renameComponent = (componentName) => {
    dispatch({
      type: types.SIDEBAR_RENAME_COMPONENT,
      screenIndex: selectedScreen,
      componentName: componentName,
      componentIndex: selectedComponent
    })
  }

  const handleBlur = event => {
    const componentName = event.target.value.trim();
    event.target.value = ''

    if (componentName.length > 0 && !discard) {
      renameComponent(componentName)
    }
    
    dispatch({
      type: types.SIDEBAR_SET_MODE,
      mode: 'view-only'
    })
  }

  const handleChange = event => {
    setComponentName(event.target.value);
  }

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      inputRef.current.blur();
    } else if (event.keyCode === 27){
      setDiscard(true);
      inputRef.current.blur();
    }
  }

  useEffect(() => {
    if (mode === 'rename-component') {
      inputRef.current.select();
    }
  }, [])

  return (
    <input
      ref={inputRef}
      autoFocus={true}
      css={Item__Input}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={componentName}
      text="text"
    />    
  )
}

export default ItemInput