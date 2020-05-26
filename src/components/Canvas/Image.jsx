import React from 'react'
import { css } from '@emotion/core'
import { useCanvasState, useSidebarState } from 'hooks/useStateValue'
import { useToolbarState, useStateValue } from 'hooks/useStateValue'
import { zoomScaling } from 'utils/zoomScaling'
import { isSelected } from 'utils/isSelected'
import types from 'reducers/types'

const Image = (props) => {  
  const { dispatch } = useStateValue()
  const { screenIndex: selectedScreen } = useSidebarState()
  const { componentIndex: selectedComponent } = useSidebarState()
  const { currentTool } = useToolbarState()
  const { zoomLevel } = useCanvasState()

  const { screenIndex: currentScreen } = props
  const { componentIndex: currentComponent } = props
  const { content, dimension, positioning } = props.config

  const boxShadow = isSelected(selectedScreen, selectedComponent, currentScreen, currentComponent)
    ? ' 0 0 8px -1px #288dfd'
    : '0 0 0 0 #288dfd'

  const height = zoomScaling(dimension.height, zoomLevel)
  const left = `${positioning.posX}px`
  const marginBottom = zoomScaling(12, zoomLevel)

  const outline = isSelected(selectedScreen, selectedComponent, currentScreen, currentComponent)
    ? '1.5px solid #288dfd80'
    : '1.5px solid transparent'

  const top = `${positioning.posY}px`
  const width = zoomScaling(dimension.width, zoomLevel)

  const Image__Image = css`
    box-shadow: ${boxShadow};
    display: block;
    height: ${height};
    left: ${left};
    object-fit: cover;
    outline: ${outline};
    position: absolute;
    top: ${top};
    width: ${width};
    :not(:last-of-type) {
      margin-bottom: ${marginBottom};
    }
  `
  
  const handleClick = (event) => {
    if (currentTool !== 'hand') {
      dispatch({
        type: types.SIDEBAR_SELECT_COMPONENT,
        screenIndex: currentScreen,
        componentIndex: currentComponent
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
      css={Image__Image}
      onClick={handleClick}
      src={content.fileData}
    />
  )
}

export default Image