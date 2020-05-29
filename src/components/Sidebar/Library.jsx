import React, { useRef } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const Container = styled.div`
  display: grid;
  width: 250px;
  height: 250px;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  grid-template-columns: repeat(2, minmax(auto, 0.5fr));
  grid-auto-rows: 125px;
  max-height: 250px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Item = props => {
  const elementRef = useRef()

  const Library__Item = css`
    display: flex;
    background-color: #292b2f;
    color: #ffffff;
    justify-content: center;
    align-items: center;
  `

  const handleDragStart = event => {
    const element = elementRef.current.getBoundingClientRect()

    /* Get the offset between the origin of the cursor and
      the origin of the element. Afterwards, store it along with
      the component type. */
    const data = JSON.stringify({
      componentType: props.name,
      offsetX: event.clientX - element.x,
      offsetY: event.clientY - element.y
    })
    
    /* Store the component data to event dataTransfer */
    event.dataTransfer.setData('new-component', data)
  }

  return (
    <div 
      css={Library__Item}
      draggable
      onDragStart={handleDragStart}
      ref={elementRef}
    >
      {props.name}
    </div>
  )
}

const Library = props => (
  <Container>
    <Item name="Image"/>
    <Item name="Image"/>
    <Item name="Image"/>
    <Item name="Image"/>
    <Item name="Image"/>
    <Item name="Image"/>
  </Container>
)

export default Library