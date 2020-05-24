import React from 'react'
import styled from '@emotion/styled'

import HandTool from 'components/Toolbar/HandTool'
import SelectTool from 'components/Toolbar/SelectTool'

import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const Container = styled.div`
  background-color: #181518;
  display: flex;
  height: 40px;
  position: fixed;
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
    </Container>
  )
}

export default Toolbar
