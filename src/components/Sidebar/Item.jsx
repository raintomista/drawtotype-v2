import React from 'react'
import styled from '@emotion/styled'
import types from 'reducers/types'

const ItemWrapper = styled.div`
  color: #ffffff;
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  padding: 13px 13px 13px 26px;
  /* &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  } */
  &:active,
  &.active {
    background-color: #288dfd;
  }
`

const Item = ({
  componentIndex,
  dispatch,
  selectedScreen,
  selectedComponent,
  screenIndex,
  text
}) => {
  const isSelected =
    selectedScreen === screenIndex &&
    selectedComponent === componentIndex

  const handleClick = () => {
    dispatch({
      type: types.SIDEBAR_SELECT_COMPONENT,
      screenIndex: screenIndex,
      componentIndex: componentIndex
    })
  }

  return (
    <ItemWrapper
      className={isSelected ? 'active' : ''}
      onClick={handleClick}
    >
      {text}
    </ItemWrapper>
  )
}

export default Item
