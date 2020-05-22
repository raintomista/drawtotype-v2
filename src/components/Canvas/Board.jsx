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
        left: 0px;
        top: 0px;
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

const Image = props => {
  const { state, dispatch } = useStateValue()

  const isSelected =
    state.sidebar.selectedScreen === props.screenIndex &&
    state.sidebar.selectedComponent === props.componentIndex

  const zoomScaling = basePx =>
    `${basePx * state.canvas.zoomLevel}px`

  return (
    <img
      onClick={() => {
        dispatch({
          type: 'SIDEBAR_SELECT_COMPONENT',
          screenIndex: props.screenIndex,
          componentIndex: props.componentIndex
        })
      }}
      css={css`
        background: #cecece;
        border: ${isSelected
          ? ' 2px solid #288dfd80'
          : '2px solid transparent'};
        box-shadow: ${isSelected
          ? ' 0 0 8px -1px #288dfd'
          : '0 0 0 0 #288dfd'};
        cursor: pointer;
        display: block;
        padding-top: calc(100% * (3 / 4));
        width: 100%;
        :not(:last-of-type) {
          margin-bottom: ${zoomScaling(12)};
        }
      `}
    />
  )
}

const FAB = () => {
  const { state, dispatch } = useStateValue()

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
        padding: ${zoomScaling(12)};
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

const Board = props => (
  <BoardWrapper>
    {props.components.map((component, componentIndex) => {
      switch (component.type) {
        case 'Image':
          return (
            <Image
              componentIndex={componentIndex}
              screenIndex={props.screenIndex}
              key={componentIndex}
            />
          )
        default:
          return
      }
    })}
  </BoardWrapper>
)

export default Board
