import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useStateValue } from 'hooks/useStateValue'
import DocumentArea from 'components/Canvas/DocumentArea'
import Container from 'components/Canvas/Container'
import Boards from 'components/Canvas/Boards'
import Board from 'components/Canvas/Board'
import types from 'reducers/types'

const Canvas = forwardRef((props, ref) => {
  const { state, dispatch } = useStateValue()
  const clickRef = useRef(false)
  const targetRef = useRef(null)


  const [initialMouse, setInitialMouse] = useState(null)
  const [initialBoundingBox, setInitialBoundingBox] = useState(null)

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

    if (currentTool === 'select') {
      if (targetRef.current.dataset.allow === 'reposition') {
        const target = targetRef.current.getBoundingClientRect()

        /* Compute the offset between the origin of the click
        and the origin of the target element */
        setInitialMouse({
          clicked: false,
          offsetX: event.clientX - target.x,
          offsetY: event.clientY - target.y
        })

        /* Select target element when a click is detected */
        dispatch({
          type: types.SIDEBAR_SELECT_COMPONENT,
          screenIndex: parseInt(targetRef.current.dataset.screenIndex),
          componentIndex: parseInt(targetRef.current.dataset.componentIndex)
        })
      } else if (targetRef.current.dataset.deselect) {
        dispatch({
          type: types.SIDEBAR_SELECT_COMPONENT,
          screenIndex: null,
          componentIndex: null
        })
      } else if (targetRef.current.dataset.resizer) {
        setInitialMouse({
          clicked: true,
          clientX: event.clientX,
          clientY: event.clientY
        })
        setInitialBoundingBox(event.target.parentElement.getBoundingClientRect())
      }
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
        posX: event.clientX - board.x - initialMouse.offsetX,
        posY: event.clientY - board.y - initialMouse.offsetY,
        screenIndex: parseInt(targetRef.current.dataset.screenIndex),
        componentIndex: parseInt(targetRef.current.dataset.componentIndex)
      })
    } else if (currentTool === 'select' && clickRef.current && targetRef.current.dataset.resizer) {
      const boundingBox = targetRef.current.parentElement
      const component = boundingBox.parentElement
      const board = component.parentElement

      const { screenIndex, componentIndex } = boundingBox.dataset
      const boardRect = board.getBoundingClientRect()

      let newHeight, newWidth, newPosX, newPosY

      switch (targetRef.current.dataset.resizerType) {
        case 'resizer-n':
          newHeight = initialBoundingBox.height - (event.clientY - initialMouse.clientY)
          newWidth = initialBoundingBox.width
          newPosX =  initialBoundingBox.x - boardRect.x
          newPosY = (initialBoundingBox.y - boardRect.y) + (event.clientY - initialMouse.clientY)
          break
        case 'resizer-w':
          newHeight = initialBoundingBox.height
          newWidth = initialBoundingBox.width - (event.clientX - initialMouse.clientX)
          newPosX = (initialBoundingBox.x - boardRect.x) + (event.clientX - initialMouse.clientX)
          newPosY = initialBoundingBox.y - boardRect.y
          break
        case 'resizer-e':
          newHeight = initialBoundingBox.height
          newWidth = initialBoundingBox.width + (event.clientX - initialMouse.clientX)
          newPosX = initialBoundingBox.x - boardRect.x
          newPosY = initialBoundingBox.y - boardRect.y
          break
        case 'resizer-s':
          newHeight = initialBoundingBox.height + (event.clientY - initialMouse.clientY)
          newWidth = initialBoundingBox.width
          newPosX = initialBoundingBox.x - boardRect.x
          newPosY = initialBoundingBox.y - boardRect.y
          break
      }
      dispatch({
        type: types.SIDEBAR_SET_COMPONENT_DIMENSION,
        height: newHeight > 0 ? newHeight : 0,
        width: newWidth > 0 ? newWidth : 0,
        screenIndex: parseInt(screenIndex),
        componentIndex: parseInt(componentIndex)
      })

      dispatch({
        type: types.SIDEBAR_SET_COMPONENT_POSITION,
        posX: newPosX < initialBoundingBox.right - boardRect.left ? newPosX : initialBoundingBox.right - boardRect.left,
        posY: newPosY < initialBoundingBox.bottom - boardRect.top ? newPosY : initialBoundingBox.bottom - boardRect.top,
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
      className={currentTool === 'hand' ? 'hand-tool-enabled' : ''}
      onMouseDownCapture={handleMouseDown}
      onMouseMoveCapture={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <DocumentArea data-deselect={true}>
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
