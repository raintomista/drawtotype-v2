import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { useStateValue } from 'hooks/useStateValue'

const HeaderWithMenu = props => {
  const { state } = useStateValue()

  const zoomScaling = basePx =>
    `${basePx * state.canvas.zoomLevel}px`

  return (
    <div
      css={css`
        position: sticky;
        top: 0;
        left: 0;
        width: 100%;
        font-size: ${zoomScaling(16)};
        height: ${zoomScaling(40)};
        padding: ${zoomScaling(12)};
        background-color: blue;
        color: white;
        line-height: ${zoomScaling(16)};
      `}
    >
      {props.children}
    </div>
  )
}

const Image = () => {
  const { state } = useStateValue()

  const zoomScaling = basePx =>
    `${basePx * state.canvas.zoomLevel}px`

  return (
    <img
      css={css`
        background: #cecece;
        margin: ${zoomScaling(12)};
        padding-top: calc((100% - ${zoomScaling(24)}) * (3 / 4));
        width: calc(100% - ${zoomScaling(24)});
      `}
    />
  )
}

const FAB = () => {
  const { state } = useStateValue()

  const zoomScaling = basePx =>
    `${basePx * state.canvas.zoomLevel}px`

  return (
    <button
      css={css`
        background-color: blue;
        border: none;
        border-radius: 100%;
        position: sticky;
        left: calc(100% - ${zoomScaling(12)});
        bottom: ${zoomScaling(12)};
        margin: ${zoomScaling(12)};
        padding: 0px;
        color: white;
        height: ${zoomScaling(35)};
        width: ${zoomScaling(35)};
      `}
    ></button>
  )
}

const BoardWrapper = props => {
  const { state } = useStateValue()

  const zoomScaling = basePx =>
    `${basePx * state.canvas.zoomLevel}px`

  return (
    <div
      css={css`
        background-color: #ffffff;
        border: 1px solid #000000;
        position: relative;
        max-height: ${zoomScaling(400)};
        max-width: ${zoomScaling(250)};
        min-height: ${zoomScaling(400)};
        min-width: ${zoomScaling(250)};
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        &:nth-of-type(n + 5) {
          margin-top: ${zoomScaling(20)};
        }
        &:not(:nth-of-type(4n)) {
          margin-right: ${zoomScaling(20)};
        }
      `}
    >
      {props.children}
    </div>
  )
}

const Board = () => (
  <BoardWrapper>
    <HeaderWithMenu>Hhahah</HeaderWithMenu>
    <Image />
    <Image />
    <Image />
    <Image />
    <FAB />
  </BoardWrapper>
)

export default Board
