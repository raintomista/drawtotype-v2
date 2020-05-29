import React from 'react'
import styled from '@emotion/styled'
import Group from 'components/Sidebar/Group'
import Library from 'components/Sidebar/Library'
import TitleBar from 'components/Sidebar/TitleBar'
import HeaderInput from 'components/Sidebar/HeaderInput'
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

const Accordions = ({ screens }) => {
  return screens.map((screen, screenIndex) => (
    <Group
      key={screenIndex}
      collapsed={screen.collapsed}
      components={screen.components}
      screenIndex={screenIndex}
      text={screen.name}
    />
  ))
}

const AccordionInput = ({ mode }) => (
  <React.Fragment>
    {mode === 'add-screen' && (
      <HeaderInput inline={false}/>
    )}
  </React.Fragment>
);

const Sidebar = () => {
  const { state } = useStateValue()
  const { mode, screens } = state.sidebar

  return (
    <Container>
      <Library/>
      <TitleBar text="Screens" />
      <Accordions screens={screens} />
      <AccordionInput mode={mode}/>
    </Container>
  )
}

export default Sidebar