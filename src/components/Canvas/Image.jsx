import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import BoundingBox from 'components/Canvas/BoundingBox'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const Image = forwardRef((props, ref) => {
  const { state, dispatch } = useStateValue()
  const [selected, setSelected] = useState(false)
  const [layout, setLayout] = useState(null)
  const elementRef = useRef()

  const { zoomLevel } = state.canvas
  const { currentTool } = state.toolbar
  const { selectedScreen, selectedComponent } = state.sidebar
  const { screenIndex, componentIndex } = props
  const { content, dimension, positioning } = props.config
  const { boardRef } = ref

  const isSelected = () => {
    return selectedScreen === screenIndex
      && selectedComponent === componentIndex
  }

  const handleClick = event => {
    if (currentTool === 'select' && !selected) {
      dispatch({
        type: types.SIDEBAR_SELECT_COMPONENT,
        screenIndex: screenIndex,
        componentIndex: componentIndex
      })
    }
  }

  useEffect(() => {
    setSelected(isSelected())
    setLayout({
      width: parseInt(dimension.width) * zoomLevel,
      height: parseInt(dimension.height) * zoomLevel,
      left: parseInt(positioning.posX) * zoomLevel,
      top: parseInt(positioning.posY) * zoomLevel
    })
  }, [])

  useEffect(() => {
    setSelected(isSelected())
  }, [selectedScreen, selectedComponent])

  useEffect(() => {
    setLayout({
      width: parseInt(dimension.width) * zoomLevel,
      height: parseInt(dimension.height) * zoomLevel,
      left: parseInt(positioning.posX) * zoomLevel,
      top: parseInt(positioning.posY) * zoomLevel
    })
  }, [positioning, zoomLevel])


  const container = css`
    position: absolute;
    user-select: none;
  `

  const image = css`
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
  `

  return (
    <div
      style={layout}
      css={container}
      ref={elementRef}
      onClickCapture={handleClick}
      draggable="false"
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
        onDragStart={event => event.preventDefault()}
        draggable="false"
      />
    </div>
  )
})

export default Image