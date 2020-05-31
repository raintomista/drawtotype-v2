import React, { forwardRef, useEffect, useRef } from 'react'
import { useStateValue } from 'hooks/useStateValue'
import DocumentArea from 'components/Canvas/DocumentArea'
import Container from 'components/Canvas/Container'
import Boards from 'components/Canvas/Boards'
import Board from 'components/Canvas/Board'
import types from 'reducers/types'

const Canvas = forwardRef((props, ref) => {
  const { state, dispatch } = useStateValue()
  const clickRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef(null)

  const { currentTool } = state.toolbar

  let isMouseDown = false
  let startX, startY, scrollLeft, scrollTop

  const maintainScrollToCenter = () => {
    const { clientHeight, clientWidth, scrollHeight, scrollWidth } = ref.current
    ref.current.scrollTop = (scrollHeight - clientHeight) / 2
    ref.current.scrollLeft = (scrollWidth - clientWidth) / 2
  }

  const handleMouseDown = event => {
    clickRef.current = true
    targetRef.current = event.target

    if (currentTool === 'select' && targetRef.current.dataset.allow === 'reposition') {
      const target = targetRef.current.getBoundingClientRect()

      /* Compute the offset between the origin of the click
        and the origin of the target element */
      offsetRef.current.x = event.clientX - target.x
      offsetRef.current.y = event.clientY - target.y

      /* Select target element when a click is detected */
      dispatch({
        type: types.SIDEBAR_SELECT_COMPONENT,
        screenIndex: parseInt(targetRef.current.dataset.screenIndex),
        componentIndex: parseInt(targetRef.current.dataset.componentIndex)
      })
    } else if (currentTool === 'hand') {
      const { offsetTop, offsetLeft } = ref.current
      isMouseDown = true
      startX = event.pageX - offsetLeft
      startY = event.pageY - offsetTop
      scrollLeft = ref.current.scrollLeft
      scrollTop = ref.current.scrollTop
    }
  }

  const handleMouseMove = event => {
    if (currentTool === 'select' && clickRef.current && targetRef.current.dataset.allow === 'reposition') {
      const board = targetRef.current.parentElement.parentElement.getBoundingClientRect()

      /* Compute the new position of the target element by adding the offset between the initial
        position of the cursor and the target element  to the current position of the cursor */
      dispatch({
        type: types.SIDEBAR_SET_COMPONENT_POSITION,
        posX: event.clientX - board.x - offsetRef.current.x,
        posY: event.clientY - board.y - offsetRef.current.y,
        screenIndex: parseInt(targetRef.current.dataset.screenIndex),
        componentIndex: parseInt(targetRef.current.dataset.componentIndex)
      })
    } else if (currentTool === 'select' && clickRef.current && targetRef.current.dataset.resizer) {
      const boundingBox = targetRef.current.parentElement
      const component = boundingBox.parentElement
      const board = component.parentElement

      const { screenIndex, componentIndex } = boundingBox.dataset
      const componentRect = component.getBoundingClientRect()
      const boardRect = board.getBoundingClientRect()

      let newHeight, newWidth, newPosX, newPosY

      switch (targetRef.current.dataset.resizerType) {
        case 'resizer-nw':
          newHeight = (componentRect.y + componentRect.height) - event.clientY
          newWidth = (componentRect.x + componentRect.width) - event.clientX
          newPosX = event.clientX - boardRect.left
          newPosY = event.clientY - boardRect.top
          break
        case 'resizer-n':
          newHeight = (componentRect.y + componentRect.height) - event.clientY
          newWidth = componentRect.width
          newPosX = componentRect.left - boardRect.left
          newPosY = event.clientY - boardRect.top
          break
        case 'resizer-ne':
          newHeight = (componentRect.y + componentRect.height) - event.clientY
          newWidth = event.clientX - componentRect.left
          newPosX = componentRect.left - boardRect.left
          newPosY = event.clientY - boardRect.top
          break
        case 'resizer-w':
          newHeight = componentRect.height
          newWidth = (componentRect.x + componentRect.width) - event.clientX
          newPosX = event.clientX - boardRect.left
          newPosY = componentRect.top - boardRect.top
          break
        case 'resizer-e':
          newHeight = componentRect.height
          newWidth = event.clientX - componentRect.left
          newPosX = componentRect.left - boardRect.left
          newPosY = componentRect.top - boardRect.top
          break
        case 'resizer-sw':
          newHeight = event.clientY - componentRect.top
          newWidth = (componentRect.x + componentRect.width) - event.clientX
          newPosX = event.clientX - boardRect.left
          newPosY = componentRect.top - boardRect.top
          break
        case 'resizer-s':
          newHeight = event.clientY - componentRect.top
          newWidth = componentRect.width
          newPosX = componentRect.left - boardRect.left
          newPosY = componentRect.top - boardRect.top
          break
        case 'resizer-se':
          newHeight = event.clientY - componentRect.top
          newWidth = event.clientX - componentRect.left
          newPosX = componentRect.left - boardRect.left
          newPosY = componentRect.top - boardRect.top
          break
      }

      dispatch({
        type: types.SIDEBAR_SET_COMPONENT_DIMENSION,
        height: newHeight,
        width: newWidth,
        screenIndex: parseInt(screenIndex),
        componentIndex: parseInt(componentIndex)
      })

      dispatch({
        type: types.SIDEBAR_SET_COMPONENT_POSITION,
        posX: newPosX,
        posY: newPosY,
        screenIndex: parseInt(screenIndex),
        componentIndex: parseInt(componentIndex)
      })
    } else if (currentTool === 'hand' && clickRef.current) {
      const { offsetTop, offsetLeft } = ref.current
      const x = event.clientX - offsetLeft
      const y = event.clientY - offsetTop
      const walkX = (x - startX) * 1.5
      const walkY = (y - startY) * 1.5
      ref.current.scrollLeft = scrollLeft - walkX
      ref.current.scrollTop = scrollTop - walkY
    }
  } 

  const handleMouseUp = event => {
    clickRef.current = false
    targetRef.current = null
  }

  const handleMouseLeave = event => {
    clickRef.current = false
    targetRef.current = null
  }
  
  useEffect(() => {
    maintainScrollToCenter()
  }, [])

  return (
    <Container
      ref={ref}
      onMouseDownCapture={handleMouseDown}
      onMouseMoveCapture={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <DocumentArea>
        <Boards>
          {state.sidebar.screens.map((screen, screenIndex) => (
            <Board
              key={screenIndex}
              screenIndex={screenIndex}
              components={screen.components}
            />
          ))}
        </Boards>
      </DocumentArea>
    </Container>
  )
})

export default Canvas
