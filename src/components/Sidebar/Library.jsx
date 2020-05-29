import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  grid-template-columns: repeat(2, minmax(auto, 0.5fr));
  grid-template-rows: repeat(2, minmax(auto, 0.5fr));
  height: 250px;
  width: 250px;
`

const Item = styled.div`
  display: flex;
  background-color: #292b2f;
  color: #ffffff;
  justify-content: center;
  align-items: center;
`

const Library = props => (
  <Container>
    <Item>Image</Item>
    <Item>Image</Item>
    <Item>Image</Item>
    <Item>Image</Item>
  </Container>
)

export default Library