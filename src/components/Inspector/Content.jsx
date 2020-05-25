import React from 'react'
import styled from '@emotion/styled'
import Header from 'components/Inspector/Header'
import Input from 'components/Inspector/Input'
import { useSidebarState } from 'hooks/useStateValue'

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

  const handleInput = (event) => {
    component.imageSrc = event.target.value.trim()
    components.splice(componentIndex, 1, component)
    screen.components = components
    screens.splice(screenIndex, 1, screen)
    dispatch({ type: types.SIDEBAR_SET_SCREENS, screens })
  }
  
  return (
    <React.Fragment>
      <Input
        placeholder="Selected Image"
        value={component.imageSrc}
        onChange={handleInput}
      />
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