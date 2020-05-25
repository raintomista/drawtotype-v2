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
  const { content, dimension } = props.config

  const boxShadow = isSelected(selectedScreen, selectedComponent, currentScreen, currentComponent)
    ? ' 0 0 8px -1px #288dfd'
    : '0 0 0 0 #288dfd'

  const height = zoomScaling(dimension.height, zoomLevel)

  const outline = isSelected(selectedScreen, selectedComponent, currentScreen, currentComponent)
    ? '1.5px solid #288dfd80'
    : '1.5px solid transparent'

  const width = !dimension.width.indexOf('%')
    ? zoomScaling(dimension.width, zoomLevel)
    : dimension.width

  const boardImage = css`
    box-shadow: ${boxShadow};
    display: block;
    height: ${height};
    object-fit: cover;
    outline: ${outline};
    width: ${width};
    :not(:last-of-type) {
      margin-bottom: ${zoomScaling(12, zoomLevel)};
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
      css={boardImage}
      onClick={handleClick}
      src={content.fileData}
    />
  )
}

export default Image