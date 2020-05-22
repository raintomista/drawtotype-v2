import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const HeaderWrapper = styled.div`
  background-color: #292b2f;
  color: #ffffff;
  display: grid;
  font-size: 16px;
  font-weight: 500;
  grid-column-gap: 12px;
  grid-template-columns: 40px 1fr 40px;
  height: 40px;
`

const HeaderBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  &.collapsed {
    transform: rotate(180deg);
  }
`

const HeaderText = styled.h2`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0px;
`

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

const Header = ({ collapsed, dispatch, screenIndex, text }) => {
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
    <HeaderWrapper>
      <HeaderBtn
        onClick={handleToggle}
        className={collapsed ? 'collapsed' : ''}
      >
        &#x25BC;
      </HeaderBtn>
      <HeaderText>{text}</HeaderText>
      <HeaderBtn onClick={handleAdd}>+</HeaderBtn>
    </HeaderWrapper>
  )
}

export default Header
