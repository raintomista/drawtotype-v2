import React from 'react'
import { css } from '@emotion/core'
import { useCanvasState, } from 'hooks/useStateValue'
import { zoomScaling } from 'utils/zoomScaling'
import Image from 'components/Canvas/Image'

const Container = props => {
  const { zoomLevel } = useCanvasState()
  const marginTop = zoomScaling(20, zoomLevel)
  const marginRight = zoomScaling(20, zoomLevel)
  const maxHeight = zoomScaling(400, zoomLevel)
  const maxWidth = zoomScaling(250, zoomLevel)
  const minHeight = zoomScaling(400, zoomLevel)
  const minWidth = zoomScaling(250, zoomLevel)
  const padding = zoomScaling(12, zoomLevel)

  const boardContainer = css`
    background-color: #ffffff;
    position: relative;
    max-height: ${maxHeight};
    max-width: ${maxWidth};
    min-height: ${minHeight};
    min-width: ${minWidth};
    padding: ${padding};
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    &:nth-of-type(n + 5) {
      margin-top: ${marginTop};
    }
    &:not(:nth-of-type(4n)) {
      margin-right: ${marginRight};
    }
  `

  return (
    <div css={boardContainer}>
      {props.children}
    </div>
  )
}

const Board = ({ components, screenIndex }) => {
  const getComponent = (component, componentIndex) => {
    switch(component.type) {
      case 'Image':
        return (
          <Image
            key={componentIndex}
            componentIndex={componentIndex}
            screenIndex={screenIndex}
            config={component.config}
          />
        )
      default:
        return
    }
  }

  return (
    <Container>
      {components.map((component, componentIndex) => 
        getComponent(component, componentIndex)
      )}
    </Container>
)
  }

export default Board
