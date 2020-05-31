import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import BoundingBox from 'components/Canvas/BoundingBox'
import { useStateValue } from 'hooks/useStateValue'

const Image = forwardRef((props, ref) => {
  const { state } = useStateValue()
  const [ selected, setSelected ] = useState(false)
  const [ layout, setLayout ] = useState(null)
  const elementRef = useRef()

  const { zoomLevel } = state.canvas
  const { selectedScreen, selectedComponent } = state.sidebar
  const { screenIndex, componentIndex } = props
  const { content, dimension, positioning } = props.config
  const { boardRef } = ref

  const isSelected = () => {
    return selectedScreen === screenIndex
      && selectedComponent === componentIndex
  }

  useEffect(() => {
    setSelected(isSelected())
    setLayout({
      width: dimension.width,
      height: dimension.height,
      left: positioning.posX,
      top: positioning.posY
    })
  }, [])

  useEffect(() => {
    setSelected(isSelected())
  }, [selectedScreen, selectedComponent])

  useEffect(() => {
    setLayout({
      width: dimension.width,
      height: dimension.height,
      left: positioning.posX,
      top: positioning.posY
    })
  }, [dimension, positioning])


  const container = css`
    position: absolute;
  `

  const image = css`
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  `
  
  return (
    <div
      style={layout}
      css={container}
      ref={elementRef}
      data-allow="drag-to-move"
      data-screen-index={screenIndex}
      data-component-index={componentIndex}
    >
      {selected && (
        <BoundingBox
          ref={{
            boardRef: boardRef,
            imageRef: elementRef
          }}
        />
      )}
      <img
        css={image}
        src={content.fileData}
      />
    </div>
  )
})

export default Image