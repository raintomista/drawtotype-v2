import React, { useEffect } from 'react'
import styled from '@emotion/styled'

import Sidebar from 'components/Sidebar'
import Canvas from 'components/Canvas'
import Inspector from 'components/Inspector'

import types from 'reducers/types'
import { useStateValue } from 'hooks/useStateValue'
import { getScreens } from 'utils/getScreens'

const Container = styled.aside`
  display: grid;
  grid-template-columns: 250px calc(100% - 500px) 250px;
  background-color: #151515;
  cursor: ${props => props.currentTool === 'hand'
    ? 'grab'
    : 'default'
  };
`

const Builder = () => {
  const { state, dispatch } = useStateValue()
  const { currentTool } = state.toolbar

  /* Retrieves screens in the project */
  const retrieveScreens = () => {
    dispatch({
      type: types.SIDEBAR_SET_SCREENS,
      screens: getScreens()
    })
  }

  /* Calls the dispatcher to increase zoom level when the ctrl + plus is pressed
    and the key press is not trigger by an input element */
  const zoomIn = event => {
    const { nodeName } = event.srcElement
    const { ctrlKey, key } = event
    if (nodeName !== 'INPUT' && ctrlKey && key === '=') {
      event.preventDefault()
      dispatch({ type: 'CANVAS_ZOOM_IN' })
    }
  }

  /* Calls the dispatcher to decrease zoom level when the ctrl + minus is pressed
    and the key press is not trigger by an input element */
  const zoomOut = () => {
    const { nodeName } = event.srcElement
    const { ctrlKey, key } = event
    if (nodeName !== 'INPUT' && ctrlKey && key === '-') {
      event.preventDefault()
      dispatch({ type: 'CANVAS_ZOOM_OUT' })
    }
  }

  const keyboardShortcuts = () => {
    const { nodeName } = event.srcElement
    const { key } = event
    
    // Prevent default behavior of the event
    event.preventDefault()

    // Check if the pressed key is a shortcut
    if (nodeName !== 'INPUT' && key === 'h') {
      dispatch({
        type: 'TOOLBAR_SET_TOOL',
        currentTool: 'hand'
      })
    } else if (nodeName !== 'INPUT' && key === 'a') {
      dispatch({
        type: 'TOOLBAR_SET_TOOL',
        currentTool: 'select'
      })
    }
  }

  /* Retrieves the screens in the project and adds event listener for zoom
    when the component is mounted. It also removes the attached event listeners
    when the component unmounts */
  useEffect(() => {
    retrieveScreens()
    document.addEventListener('keydown', zoomIn, false)
    document.addEventListener('keydown', zoomOut, false)
    // document.addEventListener('keydown', keyboardShortcuts, false)

    // Removes the event listeners before the component unmounts
    return () => {
      document.removeEventListener('keydown', zoomIn, false)
      document.removeEventListener('keydown', zoomOut, false)
      // document.removeEventListener('keydown', keyboardShortcuts, false)
    }
  }, [])

  return (
    <Container currentTool={currentTool}>
      <Sidebar/>
      <Canvas/>
      <Inspector/>
    </Container>
  )
}

export default Builder
