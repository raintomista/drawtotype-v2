import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import TextField from 'components/Inspector/TextField'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const Layout = () => {
  const { state } = useStateValue()
  const [posX, setPosX] = useState(null)
  const [posY, setPosY] = useState(null)
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)

  const { screens } = state.sidebar
  const { selectedScreen, selectedComponent } = state.sidebar
  const { posX: mouseX, posY: mouseY } = state.inspector

  const screen = selectedScreen !== null
    ? screens[selectedScreen]
    : null
  
  const component = selectedComponent !== null
    ? screen.components[selectedComponent]
    : null

  const handlePosX = (event) => {
    component.config.positioning.posX = event.target.value > 0 ? event.target.value : 0
    components.splice(componentIndex, 1, component)
    screen.components = components
    screens.splice(screenIndex, 1, screen)
    dispatch({ type: types.SIDEBAR_SET_SCREENS, screens })
  }

  const handlePosY = (event) => {
    component.config.positioning.posY = event.target.value > 0 ? event.target.value : 0
    components.splice(componentIndex, 1, component)
    screen.components = components
    screens.splice(screenIndex, 1, screen)
    dispatch({ type: types.SIDEBAR_SET_SCREENS, screens })
  }

  const handleWidth = (event) => {
    component.config.dimension.width = event.target.value > 0 ? event.target.value : 0
    components.splice(componentIndex, 1, component)
    screen.components = components
    screens.splice(screenIndex, 1, screen)
    dispatch({ type: types.SIDEBAR_SET_SCREENS, screens })
  }

  const handleHeight = (event) => {
    component.config.dimension.height = event.target.value > 0 ? event.target.value : 0
    components.splice(componentIndex, 1, component)
    screen.components = components
    screens.splice(screenIndex, 1, screen)
    dispatch({ type: types.SIDEBAR_SET_SCREENS, screens })
  }

  useEffect(() => {
    if (selectedScreen === null && selectedComponent === null) {
      setPosX(mouseX)
      setPosY(mouseY)
      setWidth(null)
      setHeight(null)
    } else {
      const { dimension, positioning } = component.config
      setPosX(positioning.posX)
      setPosY(positioning.posY)
      setWidth(dimension.width)
      setHeight(dimension.height)
    }
  }, [mouseX, mouseY, screen, component])

  const inspectorLayout = css`
    display: grid;
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    grid-template-columns: repeat(2, calc(50% - 8px));
    padding: 16px;
  `

  return (
    <div css={inspectorLayout}>
      <TextField
        label="X"
        handleChange={handlePosX}
        value={posX}
      />
      <TextField
        label="Y"
        handleChange={handlePosY}
        value={posY}
      />
      {selectedScreen !== null && selectedComponent !== null && (
        <React.Fragment>
          <TextField
            label="Width"
            handleChange={handleWidth}
            value={width}
          />
          <TextField
            label="Height"
            handleChange={handleHeight}
            value={height}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default Layout