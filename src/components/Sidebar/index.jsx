import React from 'react'
import styled from '@emotion/styled'
import Group from 'components/Sidebar/Group'
import TitleBar from 'components/Sidebar/TitleBar'
import { HeaderInput } from 'components/Sidebar/Header'
import { useStateValue } from 'hooks/useStateValue'

const Container = styled.div`
  background-color: #211f27;
  grid-area: sidebar;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: scroll;
  width: 250px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Sidebar = () => {
  const { state, dispatch } = useStateValue()
  const {
    mode,
    selectedScreen,
    selectedComponent,
    screens
  } = state.sidebar

  return (
    <Container>
      <TitleBar text="Screens" />

      {screens.map((screen, screenIndex) => (
        <Group
          key={screenIndex}
          collapsed={screen.collapsed}
          components={screen.components}
          dispatch={dispatch}
          screenIndex={screenIndex}
          selectedScreen={selectedScreen}
          selectedComponent={selectedComponent}
          text={screen.name}
        />
      ))}

      {mode === 'add-screen' && (
        <HeaderInput autoFocus={true} dispatch={dispatch} />
      )}
    </Container>
  )
}

export default Sidebar
