import React, { useEffect, useRef } from 'react'
import { useStateValue } from 'hooks/useStateValue'
import Container from 'components/Canvas/Container'
import Boards from 'components/Canvas/Boards'
import Board from 'components/Canvas/Board'
import Toolbar from 'components/Toolbar'

const Canvas = () => {
  const { state, dispatch } = useStateValue()
  const { currentTool } = state.toolbar
  const canvasRef = useRef()

  let isMouseDown = false
  let startX, startY, scrollLeft, scrollTop

  useEffect(() => {
    const { clientHeight } = canvasRef.current
    canvasRef.current.scrollTop = clientHeight / 2 - 200
  }, [])

  const handleMouseDown = e => {
    e.preventDefault()
    if (currentTool === 'hand') {
      const { offsetTop, offsetLeft } = canvasRef.current
      isMouseDown = true
      startX = e.pageX - offsetLeft
      startY = e.pageY - offsetTop
      scrollLeft = canvasRef.current.scrollLeft
      scrollTop = canvasRef.current.scrollTop
    }
  }

  const handleMouseUp = e => {
    e.preventDefault()
    if (currentTool === 'hand') {
      isMouseDown = false
    }
  }

  const handleMouseLeave = e => {
    e.preventDefault()
    if (currentTool === 'hand') {
      isMouseDown = false
    }
  }

  const handleMouseMove = e => {
    e.preventDefault()
    const { offsetTop, offsetLeft } = canvasRef.current
    
    if (currentTool === 'hand') {
      if (!isMouseDown) return
      const x = e.pageX - offsetLeft
      const y = e.pageY - offsetTop
      const walkX = (x - startX) * 1.5
      const walkY = (y - startY) * 1.5
      canvasRef.current.scrollLeft = scrollLeft - walkX
      canvasRef.current.scrollTop = scrollTop - walkY
    }
  }

  return (
    <Container
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Toolbar
        currentTool={state.toolbar.currentTool}
        dispatch={dispatch}
      />
      <Boards>
        {state.sidebar.screens.map((screen, screenIndex) => (
          <Board
            key={screenIndex}
            screenIndex={screenIndex}
            components={screen.components}
          />
        ))}
      </Boards>
    </Container>
  )
}

export default Canvas
