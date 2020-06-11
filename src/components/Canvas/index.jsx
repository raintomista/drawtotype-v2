import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

import DocumentArea from 'components/Canvas/DocumentArea'
import Boards from 'components/Canvas/Boards'
import Board from 'components/Canvas/Board'


const Canvas = props => {
  const { state, dispatch } = useStateValue()
  const [initialBoundingBox, setInitialBoundingBox] = useState(null)
  const [initialMouse, setInitialMouse] = useState(null)
  const targetRef = useRef()
  const canvasRef = useRef()

  const { screens } = state.sidebar
  const { currentTool } = state.toolbar
  const { zoomLevel } = state.canvas

  const maintainScrollToCenter = () => {
    const { clientHeight, clientWidth, scrollHeight, scrollWidth } = canvasRef.current
    canvasRef.current.scrollTop = (scrollHeight - clientHeight) / 2
    canvasRef.current.scrollLeft = (scrollWidth - clientWidth) / 2
  }

  const handleMouseDown = event => {
    targetRef.current = event.target

    if (currentTool === 'select') {
      if (targetRef.current.dataset.reposition) {
        const { screenIndex, componentIndex } = targetRef.current.dataset
        const selectedComponent = targetRef.current.parentElement.getBoundingClientRect()

        /* Compute the offset between the origin of the click
        and the origin of the target element */
        setInitialMouse({
          clicked: true,
          offsetX: event.clientX - selectedComponent.x,
          offsetY: event.clientY - selectedComponent.y
        })

        /* Select target element when a click is detected */
        dispatch({
          type: types.SIDEBAR_SELECT_COMPONENT,
          screenIndex: parseInt(screenIndex),
          componentIndex: parseInt(componentIndex)
        })
      } else if (targetRef.current.dataset.resizer) {
        const boundingBox = targetRef.current.parentElement.getBoundingClientRect()

        /* Store the origin of the targeted resizer */
        setInitialMouse({
          clicked: true,
          clientX: event.clientX,
          clientY: event.clientY
        })

        /* Store the dimension and position 
          of the targeted bounding box */
        setInitialBoundingBox(boundingBox)
      } else if (targetRef.current.dataset.deselect) {
        dispatch({
          type: types.SIDEBAR_SELECT_COMPONENT,
          screenIndex: null,
          componentIndex: null
        })
      }
    } else if (currentTool === 'hand') {
      const canvas = canvasRef.current.getBoundingClientRect()
      setInitialMouse({
        clicked: true,
        offsetX: event.clientX - canvas.x,
        offsetY: event.clientY - canvas.y,
        scrollLeft: canvasRef.current.scrollLeft,
        scrollTop: canvasRef.current.scrollTop
      })
    }
  }

  const handleMouseMove = event => {
    if (initialMouse && initialMouse.clicked) {
      if (currentTool === 'select' && targetRef.current.dataset.reposition) {
        const { screenIndex, componentIndex } = targetRef.current.dataset
        const selectedComponent = targetRef.current.parentElement
        const board = selectedComponent.parentElement.getBoundingClientRect()

        /* Compute the new position of the target element by adding the offset between the initial
          position of the cursor and the target element  to the current position of the cursor */
        dispatch({
          type: types.SIDEBAR_SET_COMPONENT_POSITION,
          posX: (event.clientX - board.x - initialMouse.offsetX) / zoomLevel,
          posY: (event.clientY - board.y - initialMouse.offsetY) / zoomLevel,
          screenIndex: parseInt(screenIndex),
          componentIndex: parseInt(componentIndex)
        })
      } else if (currentTool === 'select' && targetRef.current.dataset.resizer) {
        const { screenIndex, componentIndex } = targetRef.current.parentElement.dataset
        const boundingBox = targetRef.current.parentElement
        const selectedComponent = boundingBox.parentElement
        const board = selectedComponent.parentElement.getBoundingClientRect()

        let newHeight, newWidth, newPosX, newPosY

        switch (targetRef.current.dataset.resizerType) {
          case 'resizer-nw':
            newHeight = initialBoundingBox.height - (event.clientY - initialMouse.clientY)
            newWidth = initialBoundingBox.width - (event.clientX - initialMouse.clientX)
            newPosX = (initialBoundingBox.x - board.x) + (event.clientX - initialMouse.clientX)
            newPosY = (initialBoundingBox.y - board.y) + (event.clientY - initialMouse.clientY)
            break
          case 'resizer-n':
            newHeight = initialBoundingBox.height - (event.clientY - initialMouse.clientY)
            newWidth = initialBoundingBox.width
            newPosX = initialBoundingBox.x - board.x
            newPosY = (initialBoundingBox.y - board.y) + (event.clientY - initialMouse.clientY)
            break
          case 'resizer-ne':
            newHeight = initialBoundingBox.height - (event.clientY - initialMouse.clientY)
            newWidth = initialBoundingBox.width + (event.clientX - initialMouse.clientX)
            newPosX = initialBoundingBox.x - board.x
            newPosY = (initialBoundingBox.y - board.y) + (event.clientY - initialMouse.clientY)
            break
          case 'resizer-w':
            newHeight = initialBoundingBox.height
            newWidth = initialBoundingBox.width - (event.clientX - initialMouse.clientX)
            newPosX = (initialBoundingBox.x - board.x) + (event.clientX - initialMouse.clientX)
            newPosY = initialBoundingBox.y - board.y
            break
          case 'resizer-e':
            newHeight = initialBoundingBox.height
            newWidth = initialBoundingBox.width + (event.clientX - initialMouse.clientX)
            newPosX = initialBoundingBox.x - board.x
            newPosY = initialBoundingBox.y - board.y
            break
          case 'resizer-sw':
            newHeight = initialBoundingBox.height + (event.clientY - initialMouse.clientY)
            newWidth = initialBoundingBox.width - (event.clientX - initialMouse.clientX)
            newPosX = (initialBoundingBox.x - board.x) + (event.clientX - initialMouse.clientX)
            newPosY = initialBoundingBox.y - board.y
            break
          case 'resizer-s':
            newHeight = initialBoundingBox.height + (event.clientY - initialMouse.clientY)
            newWidth = initialBoundingBox.width
            newPosX = initialBoundingBox.x - board.x
            newPosY = initialBoundingBox.y - board.y
            break
          case 'resizer-se':
            newHeight = initialBoundingBox.height + (event.clientY - initialMouse.clientY)
            newWidth = initialBoundingBox.width + (event.clientX - initialMouse.clientX)
            newPosX = initialBoundingBox.x - board.x
            newPosY = initialBoundingBox.y - board.y
            break
        }

        // Prevent negative height when resizing the selected component
        newHeight = newHeight < 0 ? 0 : newHeight

        // Prevent negative width when resizing the selected component
        newWidth = newWidth < 0 ? 0 : newWidth

        // Limits to the bounds of the selected component when resizing
        newPosX = newPosX > initialBoundingBox.right - board.left
          ? initialBoundingBox.right - board.left : newPosX

        // Limits to the bounds of the selected component when resizing
        newPosY = newPosY > initialBoundingBox.bottom - board.top
          ? initialBoundingBox.bottom - board.top : newPosY

        dispatch({
          type: types.SIDEBAR_SET_COMPONENT_DIMENSION,
          height: newHeight / zoomLevel,
          width: newWidth / zoomLevel,
          screenIndex: parseInt(screenIndex),
          componentIndex: parseInt(componentIndex)
        })

        dispatch({
          type: types.SIDEBAR_SET_COMPONENT_POSITION,
          posX: newPosX / zoomLevel,
          posY: newPosY / zoomLevel,
          screenIndex: parseInt(screenIndex),
          componentIndex: parseInt(componentIndex)
        })
      } else if (currentTool === 'hand') {
        const canvas = canvasRef.current.getBoundingClientRect()
        const mouseX = event.clientX - canvas.x
        const mouseY = event.clientY - canvas.y
        const walkX = (mouseX - initialMouse.offsetX) * 1.5
        const walkY = (mouseY - initialMouse.offsetY) * 1.5
        canvasRef.current.scrollLeft = initialMouse.scrollLeft - walkX
        canvasRef.current.scrollTop = initialMouse.scrollTop - walkY
      }
    } else {
      const { offsetLeft, offsetTop } = canvasRef.current
      const { scrollLeft, scrollTop } = canvasRef.current

      const posX = (event.clientX - offsetLeft) + scrollLeft
      const posY = (event.clientY - offsetTop) + scrollTop

      dispatch({
        type: types.INSPECTOR_SET_POSITION,
        posX: posX,
        posY: posY
      })
    }
  }

  const handleMouseUp = () => {
    setInitialMouse(null)
    setInitialBoundingBox(null)
    targetRef.current = null
  }

  const handleMouseLeave = () => {
    setInitialMouse(null)
    setInitialBoundingBox(null)
    targetRef.current = null
  }

  useEffect(() => {
    maintainScrollToCenter()
  }, [])

  const canvasContainer = css`
    grid-area: canvas;
    max-height: 100vh;
    max-width: 100%;
    overflow: scroll;
    position: relative;
    &.hand-tool-enabled {
      cursor: grab;
    }
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(40, 40, 40, 0.8);
      border-radius: 10px;
    }
  `

  return (
    <div
      ref={canvasRef}
      css={canvasContainer}
      className={currentTool === 'hand' ? 'hand-tool-enabled' : ''}
      onMouseDownCapture={handleMouseDown}
      onMouseMoveCapture={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <DocumentArea data-deselect={true}>
        <Boards>
          {screens.map((screen, screenIndex) => (
            <Board
              key={screenIndex}
              screenIndex={screenIndex}
              components={screen.components}
            />
          ))}
        </Boards>
      </DocumentArea>
    </div>
  )
}

export default Canvas