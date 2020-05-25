import React from 'react'
import styled from '@emotion/styled'
import { toBase64 } from 'utils/base64'
import { useSidebarState } from 'hooks/useStateValue'
import Header from 'components/Inspector/Header'
import types from 'reducers/types'

const ImagePanel = () => {
  const {
    component,
    components,
    componentIndex,
    dispatch,
    screen,
    screens,
    screenIndex
  } = useSidebarState()

  let fileData, fileName

  const handleFileInput = async event => {
    if (event.target.files.length === 1) {
      fileData = event.target.files[0]
      fileName = fileData.name

      component.config.content.fileData =  await toBase64(fileData)
      components.splice(componentIndex, 1, component)
      screen.components = components
      screens.splice(screenIndex, 1, screen)

      dispatch({ type: types.SIDEBAR_SET_SCREENS, screens })
    }
  }
  
  return (
    <React.Fragment>
      <label>
        {fileData ? fileName : 'No file selected'}
        <input
          type="file"
          onChange={handleFileInput}
          style={{visibility: 'hidden'}}
        />
      </label>
    </React.Fragment>
  )
}

const Container = styled.div`
  padding: 16px;
`

const Content = () => {
  const { component } = useSidebarState()
  return (
    <Container>
      <Header>
        {component.type}
      </Header>
      <ImagePanel/>
    </Container>
  )
}

export default Content