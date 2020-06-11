import React from 'react'
import styled from '@emotion/styled'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const Dropdown = styled.select`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  padding: 0px 8px;
`

const ZoomLevel = () => {
  const { state, dispatch } = useStateValue()
  const { zoomLevel } = state.canvas

  const handleChange = (event) => {
    dispatch({
      type: types.CANVAS_SET_ZOOM,
      zoomLevel: event.target.value
    })
  }

  return (
    <Dropdown
      value={zoomLevel}
      onChange={handleChange}
    >
      <option value={0.5}>50%</option>
      <option value={0.75}>75%</option>
      <option value={1.0}>100%</option>
      <option value={1.25}>125%</option>
      <option value={1.5}>150%</option>
      <option value={1.75}>175%</option>
      <option value={2.0}>200%</option>
    </Dropdown>
  )
}

export default ZoomLevel