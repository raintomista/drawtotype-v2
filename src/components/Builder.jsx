import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import Sidebar from 'components/Sidebar'
import Toolbar from 'components/Toolbar'
import Canvas from 'components/Canvas'
import Inspector from 'components/Inspector'

import types from 'reducers/types'
import { useStateValue } from 'hooks/useStateValue'
import { getScreens } from 'utils/getScreens'
import BoundingBox from './Canvas/BoundingBox'

const Container = styled.aside`
  background-color: #151515;
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: 40px 1fr;
  grid-template-areas: 
    "sidebar toolbar inspector"
    "sidebar canvas inspector";
  /* cursor: ${props => props.currentTool === 'hand'
    ? 'grab'
    : 'default'
  }; */
`

const Builder = () => {
  const { state, dispatch } = useStateValue()
  const clickRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef(null)

  const { currentTool } = state.toolbar
  const canvasRef = useRef()

  /* Calls the dispatcher to increase zoom level when the ctrl + plus is pressed
    and the key press is not trigger by an input element */
  const zoomIn = event => {
    const { nodeName } = event.srcElement
    const { ctrlKey, key } = event

    if (nodeName !== 'INPUT' && ctrlKey && key === '=') {
      event.preventDefault()
      dispatch({ type: 'CANVAS_ZOOM_IN' })
    }
  }

  /* Calls the dispatcher to decrease zoom level when the ctrl + minus is pressed
    and the key press is not trigger by an input element */
  const zoomOut = () => {
    const { nodeName } = event.srcElement
    const { ctrlKey, key } = event
    if (nodeName !== 'INPUT' && ctrlKey && key === '-') {
      event.preventDefault()
      dispatch({ type: 'CANVAS_ZOOM_OUT' })
    }
  }

  const keyboardShortcuts = () => {
    const { nodeName } = event.srcElement
    const { key } = event

    // Prevent default behavior of the event
    event.preventDefault()

    // Check if the pressed key is a shortcut
    if (nodeName !== 'INPUT' && key === 'h') {
      dispatch({
        type: 'TOOLBAR_SET_TOOL',
        currentTool: 'hand'
      })
    } else if (nodeName !== 'INPUT' && key === 'a') {
      dispatch({
        type: 'TOOLBAR_SET_TOOL',
        currentTool: 'select'
      })
    }
  }



  const handleMouseDown = event => {
    clickRef.current = true // Flag for click
    targetRef.current = event.target.parentElement // Reference to the target element

    /* Handler for component re-positioning */
    if (targetRef.current.dataset.allow === 'drag-to-move') {
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
    }
  }

  const handleMouseMove = event => {
    /* Handle the movement of the mouse when left click is still being pressed down */
    if (clickRef.current === true && targetRef.current.dataset.allow === 'drag-to-move') {
      const board = targetRef.current.parentElement.getBoundingClientRect()

      /* Compute the new position of the target element by adding the offset between the initial
        position of the cursor and the target element  to the current position of the cursor */
      dispatch({
        type: types.SIDEBAR_SET_COMPONENT_POSITION,
        posX: event.clientX - board.x - offsetRef.current.x,
        posY: event.clientY - board.y - offsetRef.current.y,
        screenIndex: parseInt(targetRef.current.dataset.screenIndex),
        componentIndex: parseInt(targetRef.current.dataset.componentIndex)
      })
    }
  }

  const handleMouseUp = event => {
    clickRef.current = false
    targetRef.current = null
  }

  /* Retrieves the screens in the project and adds event listener for zoom
    when the component is mounted. It also removes the attached event listeners
    when the component unmounts */
  useEffect(() => {
    document.addEventListener('keydown', zoomIn, false)
    document.addEventListener('keydown', zoomOut, false)
    // document.addEventListener('mousedown', handleMouseDown, true)
    // document.addEventListener('mousemove', handleMouseMove, true)
    // document.addEventListener('mouseup', handleMouseUp, true)
    // document.addEventListener('keydown', keyboardShortcuts, false)

    // Removes the event listeners before the component unmounts
    return () => {
      document.removeEventListener('keydown', zoomIn, false)
      document.removeEventListener('keydown', zoomOut, false)
      // document.removeEventListener('keydown', keyboardShortcuts, false)
    }
  }, [])

  return (
    <Container currentTool={currentTool}>
      <Sidebar />
      <Toolbar />
      <Canvas ref={canvasRef} />
      <Inspector />
    </Container>
  )
}

export default Builder
