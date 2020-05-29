import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import Image from 'components/Canvas/Image'
import { useStateValue } from 'hooks/useStateValue'
import { useCanvasState, } from 'hooks/useStateValue'
import { zoomScaling } from 'utils/zoomScaling'
import types from 'reducers/types'

const Container = props => {
  const { zoomLevel } = useCanvasState()
  const marginTop = zoomScaling(20, zoomLevel)
  const marginRight = zoomScaling(20, zoomLevel)
  const maxHeight = zoomScaling(400, zoomLevel)
  const maxWidth = zoomScaling(250, zoomLevel)
  const minHeight = zoomScaling(400, zoomLevel)
  const minWidth = zoomScaling(250, zoomLevel)
  const padding = zoomScaling(12, zoomLevel)

  const boardContainer = css`
    background-color: #ffffff;
    position: relative;
    max-height: ${maxHeight};
    max-width: ${maxWidth};
    min-height: ${minHeight};
    min-width: ${minWidth};
    padding: ${padding};
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    &:nth-of-type(n + 5) {
      margin-top: ${marginTop};
    }
    &:not(:nth-of-type(4n)) {
      margin-right: ${marginRight};
    }
    &.selected {
      outline: 2px solid #288dfd;
    }
  `
  return (
    <div
      css={boardContainer}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

const Board = ({ components, screenIndex }) => {
  const { state, dispatch } = useStateValue()
  const [ selected, setSelected ] = useState(false)
  
  const { selectedScreen, selectedComponent } = state.sidebar
  const { currentTool } = state.toolbar

  useEffect(() => {
    setSelected(isSelected())
  }, [selectedScreen, selectedComponent])

  function isSelected () {
    return selectedScreen === screenIndex
      && selectedComponent === null
  }
   
  const getComponent = (component, componentIndex) => {
    switch (component.type) {
      case 'Image':
        return (
          <Image
            key={componentIndex}
            componentIndex={componentIndex}
            screenIndex={screenIndex}
            config={component.config}
          />
        )
      default:
        return
    }
  }

  const handleClick = (event) => {
    if (currentTool !== 'hand') {
      dispatch({
        type: types.SIDEBAR_SELECT_SCREEN,
        screenIndex: screenIndex
      })
    }
  }
  

  return (
    <Container onClick={handleClick} className={selected ? 'selected' : ''}>
      {selected.toS}
      {components.map((component, componentIndex) =>
        getComponent(component, componentIndex)
      )}
    </Container>
  )
}

export default Board
