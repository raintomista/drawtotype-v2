import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import ItemInput from 'components/Sidebar/ItemInput'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const ItemWrapper = styled.div`
  background-color: #292b2f;
  cursor: pointer;
  height: 40px;
  padding: 13px 13px 13px 26px;
  &.selected {
    background-color: #288dfd;
  }
`

const ItemText = styled.h2`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`

const ItemContent = (props) => {
  const { mode, isSelected, itemText } = props
  const { screenIndex, componentIndex } = props

  const isInputVisible = isSelected && mode === 'rename-component'
  const isTextVisible = !isSelected || (isSelected
    && mode !== 'rename-component')

  if (isTextVisible) {
    return (
      <ItemText>
        {itemText}
      </ItemText>
    );
  } else if (isInputVisible) {
    return (
      <ItemInput
        screenIndex={screenIndex} 
        componentIndex={componentIndex}
      />
    )
  }
}

const Item = ({ itemText, componentIndex, screenIndex }) => {
  const { state, dispatch } = useStateValue()
  const { selectedScreen, selectedComponent } = state.sidebar
  const { mode } = state.sidebar

  const dataProps = {
    'data-allow': 'context-menu',
    'data-item-type': 'component',
    'data-screen-index': screenIndex,
    'data-component-index': componentIndex
  }
  
  const isSelected = selectedScreen === screenIndex
    && selectedComponent === componentIndex

  const handleClick = () => {
    dispatch({
      type: types.SIDEBAR_SELECT_COMPONENT,
      screenIndex: screenIndex,
      componentIndex: componentIndex
    })
  }

  return (
    <ItemWrapper
      className={isSelected ? 'selected' : ''}
      onClick={handleClick}
      {...dataProps}
    >
      <ItemContent
        mode={mode}
        itemText={itemText}
        isSelected={isSelected}
        screenIndex={screenIndex}
        componentIndex={componentIndex}
      />
    </ItemWrapper>
  )
}

export default Item
