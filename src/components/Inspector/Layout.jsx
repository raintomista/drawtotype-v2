import React from 'react'
import { css } from '@emotion/core'
import TextField from 'components/Inspector/TextField'
import { useSidebarState } from 'hooks/UseStateValue'
import types from 'reducers/types'

const Layout = () => {
  const {
    component,
    components,
    componentIndex,
    dispatch,
    screen,
    screens,
    screenIndex
  } = useSidebarState()

  const {
    dimension,
    positioning
  } = component.config

  const inspectorLayout = css`
    display: grid;
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    grid-template-columns: repeat(2, calc(50% - 8px));
    padding: 16px;
  `

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

  return (
    <div css={inspectorLayout}>
      <TextField
        label="X"
        handleChange={handlePosX}
        value={positioning.posX}
      />
      <TextField
        label="Y"
        handleChange={handlePosY}
        value={positioning.posY}
      />
      <TextField
        label="Width"
        handleChange={handleWidth}
        value={dimension.width}
      />
      <TextField
        label="Height"
        handleChange={handleHeight}
        value={dimension.height}
      />
    </div>
  )
}

export default Layout