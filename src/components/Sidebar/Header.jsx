import React from 'react'
import styled from '@emotion/styled'
import { FaCaretDown, FaPlusCircle } from "react-icons/fa"
import HeaderInput from 'components/Sidebar/HeaderInput'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const Wrapper = styled.div`
  background-color: ${props =>
    props.isSelected ? '#288dfd' : '#292b2f'
  };
  color: #ffffff;
  cursor: pointer;
  display: grid;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  grid-column-gap: 12px;
  grid-template-columns: 40px 1fr 40px;
  user-select: none;
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  &.collapsed {
    transform: rotate(180deg);
  }
`

const Text = styled.h2`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0px;
`

const Header = ({ collapsed, screenIndex, text }) => {
  const { state, dispatch } = useStateValue()
  const { selectedScreen, selectedComponent } = state.sidebar
  const { mode } = state.sidebar

  const isSelected = selectedScreen === screenIndex
    && selectedComponent === null 

  const handleClick = () => {
    dispatch({
      type: types.SIDEBAR_SELECT_SCREEN,
      screenIndex: screenIndex
    })
  }

  const handleToggle = () => {
    dispatch({
      type: types.SIDEBAR_TOGGLE_COLLAPSED,
      screenIndex: screenIndex
    })
  }

  const handleAdd = () => {
    dispatch({
      type: types.SIDEBAR_ADD_COMPONENT,
      screenIndex: screenIndex,
      componentType: prompt(
        'Enter component type',
        'HeaderWithMenu'
      )
    })
  }

  return (
    <Wrapper isSelected={isSelected} onClick={handleClick}>
      <Button onClick={handleToggle} className={collapsed ? 'collapsed' : ''}>
        <FaCaretDown />
      </Button>

      {/* Display text when sidebar mode is set to 'view-only' */}
      {(!isSelected || isSelected && mode !== 'rename-screen') && (
        <Text
          data-allow="context-menu"
          data-item-type="screen"
          data-screen-index={screenIndex}
        >
          {text}
        </Text>
      )}

      {/* Display input when sidebar mode is set to 'rename-screen' */}
      {isSelected && mode === 'rename-screen' && (
        <HeaderInput
          screenIndex={screenIndex}
        />
      )}

      <Button onClick={handleAdd}>
        <FaPlusCircle />
      </Button>
    </Wrapper>
  )
}

export default Header
