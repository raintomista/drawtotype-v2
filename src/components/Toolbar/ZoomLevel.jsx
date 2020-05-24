import React from 'React'
import styled from '@emotion/styled'

const Dropdown = styled.select`
  background-color: transparent;
  border: none;
  color: #ffffff;
`

const ZoomLevel = () => (
  <Dropdown value={1.0}>
    <option value={0.5}>50%</option>
    <option value={0.75}>75%</option>
    <option value={1.0}>100%</option>
    <option value={1.25}>125%</option>
    <option value={1.5}>150%</option>
    <option value={1.75}>175%</option>
    <option value={2.0}>200%</option>
  </Dropdown>
)

export default ZoomLevel