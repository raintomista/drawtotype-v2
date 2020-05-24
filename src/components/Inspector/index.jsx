import React from 'React'
import styled from '@emotion/styled'

import Positioning from 'components/Inspector/Positioning'
import Dimensions from 'components/Inspector/Dimensions'

const Container = styled.div`
  background-color: #211f27;
  grid-area: inspector;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: scroll;
  padding: 16px;
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
    </Container>
  )
}

export default Inspector