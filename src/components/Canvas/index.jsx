import React, { useEffect, useRef } from 'react'
import { useStateValue } from 'hooks/useStateValue'
import Wrapper from 'components/Canvas/Wrapper'
import Boards from 'components/Canvas/Boards'
import Board from 'components/Canvas/Board'

const Canvas = () => {
  const { state } = useStateValue()
  const canvasRef = useRef()
  let isMouseDown = false
  let startX, startY, scrollLeft, scrollTop

  useEffect(() => {
    const { clientHeight } = canvasRef.current
    canvasRef.current.scrollTop = clientHeight / 2 - 200
  }, [])

  const handleMouseDown = e => {
    e.preventDefault()
    const { offsetTop, offsetLeft } = canvasRef.current
    isMouseDown = true
    startX = e.pageX - offsetLeft
    startY = e.pageY - offsetTop
    scrollLeft = canvasRef.current.scrollLeft
    scrollTop = canvasRef.current.scrollTop
  }

  const handleMouseUp = e => {
    e.preventDefault()
    isMouseDown = false
  }

  const handleMouseLeave = e => {
    e.preventDefault()
    isMouseDown = false
  }

  const handleMouseMove = e => {
    e.preventDefault()
    const { offsetTop, offsetLeft } = canvasRef.current
    if (!isMouseDown) return
    const x = e.pageX - offsetLeft
    const y = e.pageY - offsetTop
    const walkX = (x - startX) * 1.5
    const walkY = (y - startY) * 1.5
    canvasRef.current.scrollLeft = scrollLeft - walkX
    canvasRef.current.scrollTop = scrollTop - walkY
  }

  return (
    <Wrapper
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Boards>
        {state.sidebar.screens.map((screen, index) => (
          <Board key={index} />
        ))}
      </Boards>
    </Wrapper>
  )
}

export default Canvas
