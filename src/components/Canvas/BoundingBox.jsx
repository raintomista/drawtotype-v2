import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const BoundingBox = props => {
  const boundingBox = css`
    position: absolute;
    border: 1px solid #4286f4;
    height: 100%;
    width: 100%;
    z-index: 1;
  `

  const resizer = css`
    position: absolute;
    background-color: #4286f4;
    width: 6px;
    height: 6px;
    z-index: 1;
  `

  const resizerNW = css`
    ${resizer};
    cursor: nw-resize;
    left: -3px;
    top: -3px;
  `
  const resizerN = css`
    ${resizer};
    cursor: ns-resize;
    left: calc(50% - 3px);
    top: -3px;
  `

  const resizerNE = css`
    ${resizer};
    cursor: ne-resize;
    right: -3px;
    top: -3px;
  `

  const resizerW = css`
    ${resizer};
    cursor: ew-resize;
    left: -3px;
    top: calc(50% - 3px);
  `

  const resizerE = css`
    ${resizer};
    cursor: ew-resize;
    right: -3px;
    top: calc(50% - 3px);
  `

  const resizerSW = css`
    ${resizer};
    cursor: sw-resize;
    left: -3px;
    bottom: -3px;
  `
  const resizerS = css`
    ${resizer};
    cursor: ns-resize;
    left: calc(50% - 3px);
    bottom: -3px;
  `

  const resizerSE = css`
    ${resizer};
    cursor: se-resize;
    right: -3px;
    bottom: -3px;
  `

  return (
    <div css={boundingBox}>
      <div css={resizerNW}></div>
      <div css={resizerN}></div>
      <div css={resizerNE}></div>
      <div css={resizerW}></div>
      <div css={resizerE}></div>
      <div css={resizerSW}></div>
      <div css={resizerS}></div>
      <div css={resizerSE}></div>
    </div>
  )
}

export default BoundingBox