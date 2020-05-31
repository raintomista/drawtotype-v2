import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import Sidebar from 'components/Sidebar'
import Toolbar from 'components/Toolbar'
import Canvas from 'components/Canvas'
import Inspector from 'components/Inspector'

import types from 'reducers/types'
import { useStateValue } from 'hooks/useStateValue'
import { getScreens } from 'utils/getScreens'
import BoundingBox from './Canvas/BoundingBox'

const Container = styled.aside`
  background-color: #151515;
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr 250px;
  grid-template-rows: 40px 1fr;
  grid-template-areas: 
    "sidebar toolbar inspector"
    "sidebar canvas inspector";
`

const Builder = () => {
  const { state, dispatch } = useStateValue()
  const canvasRef = useRef()

  const { currentTool } = state.toolbar
  
  const keyboardShortcuts = event => {
    const { nodeName } = event.srcElement
    const { code: keyCode } = event

    if (nodeName !== 'INPUT') {
      event.preventDefault()
      if (event.ctrlKey && (keyCode === 'NumpadAdd' || keyCode === 'Equal')) {
        dispatch({ type: 'CANVAS_ZOOM_IN' })
      } else if (event.ctrlKey && (keyCode === 'NumpadSubtract' || keyCode === 'Minus')) {
        dispatch({ type: 'CANVAS_ZOOM_OUT' })
      } else if (keyCode === 'KeyA') {
        dispatch({
          type: 'TOOLBAR_SET_TOOL',
          currentTool: 'select'
        })
      } else if (keyCode === 'KeyH') {
        dispatch({
          type: 'TOOLBAR_SET_TOOL',
          currentTool: 'hand'
        })
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyboardShortcuts, true)
    
    return () => {
      document.removeEventListener('keydown', zoomIn, true)
    }
  }, [])


  return (
    <Container currentTool={currentTool}>
      <Sidebar />
      <Toolbar />
      <Canvas ref={canvasRef} />
      <Inspector />
    </Container>
  )
}

export default Builder
