import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { FaCaretDown } from "react-icons/fa"
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

export const HeaderInput = ({ dispatch, ...props }) => {
  const handleBlur = event => {
    // Trim whitespaces
    const screenName = event.target.value.trim()
    // Validate if the screen name is not an empty string
    if (screenName.length > 0) {
      dispatch({
        type: types.SIDEBAR_ADD_SCREEN,
        screenName: screenName
      })
    }
    // Reset to view-only mode
    dispatch({
      type: types.SIDEBAR_SET_MODE,
      mode: 'view-only'
    })
  }

  const handleKeyPress = event => {
    // If Enter key is pressed, re-use onBlur handler
    if (event.key === 'Enter') {
      handleBlur(event)
    }
  }

  return (
    <input
      {...props}
      autoFocus={true}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      css={css`
        background-color: #292b2f;
        border: none;
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
        height: 40px;
        padding: 12px 52px;
        width: 100%;
      `}
    />
  )
}

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
    <Wrapper
      isSelected={isSelected}
      onClick={handleClick}
    >
      <Button
        onClick={handleToggle}
        className={collapsed ? 'collapsed' : ''}
      >
        <FaCaretDown/>
      </Button>
      <Text>{text}</Text>
      <Button onClick={handleAdd}>+</Button>
    </Wrapper>
  )
}

export default Header
