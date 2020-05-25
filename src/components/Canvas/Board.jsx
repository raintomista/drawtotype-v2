import React from 'react'
import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'
import { isSelectedComponent as isSelected } from 'utils/isSelected'
import { zoomScaling } from 'utils/zoomScaling'
import types from 'reducers/types'

const HeaderWithMenu = props => {
  const { state } = useStateValue()
  const { zoomLevel } = state.canvas

  const style = css`
    position: sticky;
    left: 0px;
    top: 0px;
    background-color: blue;
    color: white;
    font-size: ${zoomScaling(16, zoomLevel)};
    height: ${zoomScaling(40, zoomLevel)};
    padding: ${zoomScaling(12, zoomLevel)};
    line-height: ${zoomScaling(16, zoomLevel)};
    width: 100%;
  `

  return (
    <div css={style}>
      {props.children}
    </div>
  )
}

const Image = ({ screenIndex, componentIndex, imageSrc }) => {
  const { state, dispatch } = useStateValue()
  const selectedA = state.sidebar.selectedScreen
  const selectedB = state.sidebar.selectedComponent
  const currentTool = state.toolbar.currentTool
  const zoomLevel = state.canvas.zoomLevel

  const getBorder = () => 
    isSelected(selectedA, selectedB, screenIndex, componentIndex)
      ? '2px solid #288dfd80'
      : '2px solid transparent'
  
  const getBoxShadow = () =>
    isSelected(selectedA, selectedB, screenIndex, componentIndex)
      ? ' 0 0 8px -1px #288dfd'
      : '0 0 0 0 #288dfd'

  const style = css`
    border: ${getBorder()};
    box-shadow: ${getBoxShadow()};
    display: block;
    height: 250px;
    width: 100%;
    object-fit: cover;
    :not(:last-of-type) {
      margin-bottom: ${zoomScaling(12, zoomLevel)};
    }
  `

  const handleClick = (event) => {
    if (currentTool !== 'hand') {
      dispatch({
        type: types.SIDEBAR_SELECT_COMPONENT,
        screenIndex: screenIndex,
        componentIndex: componentIndex
      })

      dispatch({
        type: types.INSPECTOR_SET_POSITION,
        posX: event.target.offsetLeft,
        posY: event.target.offsetTop
      })

      dispatch({
        type: types.INSPECTOR_SET_DIMENSION,
        width: event.target.clientWidth,
        height: event.target.clientHeight
      })
    }
  }

  return (
    <img
      css={style}
      onClick={handleClick}
      src={imageSrc}
    />
  )
}

const FAB = () => {
  const { state, dispatch } = useStateValue()
  const zoomLevel = state.canvas.zoomLevel

  const style = css`
    background-color: blue;
    border: none;
    border-radius: 100%;
    color: white;
    padding: 0px;
    position: sticky;
    left: calc(100% - ${zoomScaling(12, zoomLevel)});
    bottom: ${zoomScaling(12, zoomLevel)};
    height: ${zoomScaling(35, zoomLevel)};
    margin: ${zoomScaling(12, zoomLevel)};
    width: ${zoomScaling(35, zoomLevel)};
  `

  return (
    <button css={style}>
    </button>
  )
}

const Container = props => {
  const { state } = useStateValue()
  const zoomLevel = state.canvas.zoomLevel

  const style = css`
    background-color: #ffffff;
    border: 1px solid #000000;
    position: relative;
    max-height: ${zoomScaling(400, zoomLevel)};
    max-width: ${zoomScaling(250, zoomLevel)};
    min-height: ${zoomScaling(400, zoomLevel)};
    min-width: ${zoomScaling(250, zoomLevel)};
    padding: ${zoomScaling(12, zoomLevel)};
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    &:nth-of-type(n + 5) {
      margin-top: ${zoomScaling(20, zoomLevel)};
    }
    &:not(:nth-of-type(4n)) {
      margin-right: ${zoomScaling(20, zoomLevel)};
    }
  `

  return (
    <div css={style}>
      {props.children}
    </div>
  )
}

const Board = ({ components, componentIndex, screenIndex }) => {

  const getComponent = (component, componentIndex) => {
    switch(component.type) {
      case 'Image':
        return (
          <Image
            key={componentIndex}
            componentIndex={componentIndex}
            screenIndex={screenIndex}
            imageSrc={component.imageSrc}
          />
        )
      default:
        return
    }
  }

  return (
    <Container>
      {components.map((component, componentIndex) => 
        getComponent(component, componentIndex)
      )}
    </Container>
)
  }

export default Board
