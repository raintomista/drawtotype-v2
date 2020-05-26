import React from 'react'
import { css } from '@emotion/core'

const TextField = ({ handleChange, label, value }) => {
  const TextField__Label = css`
    color: rgba(255, 255, 255, 0.5);
    display: block;
    font-size: 14px;
    line-height: 20px;
    width: 100%;
  `

  const TextField__Input = css`
    background-color: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.2);
    display: block;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
  `

  const handleFocus = (event) => {
    event.target.select()
  }

  return (
    <div>
      <label css={TextField__Label}>
        {label}
      </label>
      <input
        css={TextField__Input}
        max={999}
        min={0}
        onChange={handleChange}
        onFocus={handleFocus}
        value={parseInt(value)}
        type="number"
      />
    </div>
  )
}

export default TextField