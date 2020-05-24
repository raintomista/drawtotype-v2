import React from 'react'
import styled from '@emotion/styled'

import HandTool from 'components/Toolbar/HandTool'
import SelectTool from 'components/Toolbar/SelectTool'
import ZoomLevel from 'components/Toolbar/ZoomLevel'

import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const Container = styled.div`
  background-color: #181518;
  display: flex;
  grid-area: toolbar;
  height: 40px;
`

const Toolbar = () => {
  const { state, dispatch } = useStateValue()
  const { currentTool } = state.toolbar

  const isActive = (toolName) => {
    return currentTool === toolName
  }

  const handleSetTool = (toolName) => () => {
    dispatch({
      type: types.TOOLBAR_SET_TOOL,
      currentTool: toolName
    })
  }

  return (
    <Container>
      <SelectTool
        active={isActive('select')}
        onClick={handleSetTool('select')}
      />
      <HandTool
        active={isActive('hand')}
        onClick={handleSetTool('hand')}
      />
      <ZoomLevel/>
    </Container>
  )
}

export default Toolbar
