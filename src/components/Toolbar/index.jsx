import React from 'react'
import styled from '@emotion/styled'
import {
  FaMousePointer as SelectIcon,
  FaHandPaper as HandIcon
} from "react-icons/fa";
import * as types from 'reducers/toolbar/types'
import { useStateValue } from 'hooks/useStateValue'

const Container = styled.div`
  background-color: #181518;
  display: flex;
  height: 40px;
  position: fixed;
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => !props.active ? '#929292' : '#ccc9cd'};
  height: 40px;
  width: 40px;
`

const SelectTool = (props) => {
  return (
    <Button {...props}>
      <SelectIcon />
    </Button>
  )
}

const HandTool = (props) => {
  return (
    <Button {...props}>
      <HandIcon />
    </Button>
  )
}

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
