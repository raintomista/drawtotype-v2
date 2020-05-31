import React, { forwardRef, useRef, useState } from 'react'
import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const ResizeHandle = ({ type: resizerType, ...props }) => {
  const resizers = {
    "resizer-nw": {
      "cursor": "nw-resize",
      "top": "-3px",
      "left": "-3px",
      "bottom": "auto",
      "right": "auto"
    },
    "resizer-n": {
      "cursor": "ns-resize",
      "top": "-3px",
      "left": "calc(50% - 3px)",
      "bottom": "auto",
      "right": "auto"
    },
    "resizer-ne": {
      "cursor": "ne-resize",
      "top": "-3px",
      "left": "auto",
      "bottom": "auto",
      "right": "-3px"
    },
    "resizer-w": {
      "cursor": "ew-resize",
      "top": "calc(50% - 3px)",
      "left": "-3px",
      "bottom": "auto",
      "right": "auto"
    },
    "resizer-e": {
      "cursor": "ew-resize",
      "top": "calc(50% - 3px)",
      "left": "auto",
      "bottom": "auto",
      "right": "-3px"
    },
    "resizer-sw": {
      "cursor": "sw-resize",
      "top": "auto",
      "left": "-3px",
      "bottom": "-3px",
      "right": "auto"
    },
    "resizer-s": {
      "cursor": "ns-resize",
      "top": "auto",
      "left": "calc(50% - 3px)",
      "bottom": "-3px",
      "right": "auto"
    },
    "resizer-se": {
      "cursor": "se-resize",
      "top": "auto",
      "left": "auto",
      "bottom": "-3px",
      "right": "-3px"
    },
  }

  const {
    [resizerType]: {
      cursor,
      top,
      left,
      bottom,
      right
    }
  } = resizers

  const resizer = css`
    position: absolute;
    background-color: #ffffff;
    border: 1px solid #4286f4;
    height: 6px;
    width: 6px;
    z-index: 1;
    cursor: ${cursor};
    top: ${top};
    left: ${left};
    bottom: ${bottom};
    right: ${right};
    &:hover {
      background-color: #4286f4;
    }
  `

  return (
    <div
      css={resizer}
      data-allow="resize"
      {...props}
    >
    </div>
  );
}

const BoundingBox = forwardRef((props, { imageRef, boardRef }) => {
  const { state, dispatch } = useStateValue()
  const clickRef = useRef(false);

  const { selectedScreen, selectedComponent } = state.sidebar

  const handleMouseDown = () => {
    clickRef.current = true;
  }

  const handleMouseMove = event => {
    if (clickRef.current) {
      const board = boardRef.current.getBoundingClientRect()
      const image = imageRef.current.getBoundingClientRect()

      dispatch({
        type: types.SIDEBAR_SET_COMPONENT_DIMENSION,
        height: image.height,
        width: event.clientX - image.left,
        screenIndex: selectedScreen,
        componentIndex: selectedComponent
      })
    }
  }

  const handleMouseUp = () => {
    clickRef.current = false
  }

  const boundingBox = css`
    position: absolute;
    border: 1px solid #4286f4;
    height: 100%;
    width: 100%;
    z-index: 1;
  `
  
  return (
    <div css={boundingBox}>
      <ResizeHandle
        type="resizer-n"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizeHandle
        type="resizer-e"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizeHandle
        type="resizer-w"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizeHandle
        type="resizer-s"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizeHandle
        type="resizer-nw"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizeHandle
        type="resizer-ne"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizeHandle
        type="resizer-sw"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <ResizeHandle
        type="resizer-se"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  )
})

export default BoundingBox