import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

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
  :nth-child(n + 5) {
    margin-top: 20px;
  }
  :not(:nth-child(4n)) {
    margin-right: 20px;
  }
`

const Canvas = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const { clientHeight } = canvasRef.current
    canvasRef.current.scrollTop = clientHeight / 2 - 200
  }, [])

  return (
    <Wrapper ref={canvasRef}>
      <Boards>
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
        <Board />
      </Boards>
    </Wrapper>
  )
}

export default Canvas
