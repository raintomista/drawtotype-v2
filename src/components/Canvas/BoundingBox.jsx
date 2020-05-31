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
      data-resizer={true}
      data-resizer-type={resizerType}
      {...props}
    >
    </div>
  );
}

const BoundingBox = forwardRef((props, { imageRef, boardRef }) => {
  const { state, dispatch } = useStateValue()
  const clickRef = useRef(false);

  const { selectedScreen, selectedComponent } = state.sidebar

  const boundingBox = css`
    position: absolute;
    border: 1px solid #4286f4;
    height: 100%;
    width: 100%;
    z-index: 1;
  `
  
  return (
    <div
      css={boundingBox}
      data-allow="reposition"
      data-screen-index={selectedScreen}
      data-component-index={selectedComponent}
    >
      <ResizeHandle type="resizer-n"/>
      <ResizeHandle type="resizer-e"/>
      <ResizeHandle type="resizer-w"/>
      <ResizeHandle type="resizer-s"/>
      <ResizeHandle type="resizer-nw"/>
      <ResizeHandle type="resizer-ne"/>
      <ResizeHandle type="resizer-sw"/>
      <ResizeHandle type="resizer-se"/>
    </div>
  )
})

export default BoundingBox