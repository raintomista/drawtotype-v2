import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { useStateValue } from 'hooks/useStateValue'

const Wrapper = styled.div`
  max-height: 100vh;
  max-width: 100%;
  overflow: scroll;
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

const Boards = styled.div`
  background-color: #151515;
  box-sizing: content-box;
  display: flex;
  max-width: 1060px;
  flex-wrap: wrap;
  padding: 20vw;
  transform: scale(1.2);
  width: max-content;
`

const Board = styled.div`
  background-color: #ffffff;
  border: 1px solid #000000;
  min-height: 400px;
  min-width: 250px;
  :nth-of-type(n + 5) {
    margin-top: 20px;
  }
  :not(:nth-of-type(4n)) {
    margin-right: 20px;
  }
`

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
          <Board />
        ))}
      </Boards>
    </Wrapper>
  )
}

export default Canvas
