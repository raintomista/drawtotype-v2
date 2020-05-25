import React from 'React'
import styled from '@emotion/styled'

import Positioning from 'components/Inspector/Positioning'
import Dimensions from 'components/Inspector/Dimensions'
import Content from 'components/Inspector/Content'

const Container = styled.div`
  background-color: #211f27;
  grid-area: inspector;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: scroll;
  width: 250px;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Inspector = () => {
  return (
    <Container>
      <Positioning/>
      <Dimensions/>
      <Content/>
    </Container>
  )
}

export default Inspector