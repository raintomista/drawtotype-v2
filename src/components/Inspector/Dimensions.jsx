
import React from 'react'
import styled from '@emotion/styled'

import Stat from 'components/Inspector/Stat'
import { useStateValue } from 'hooks/useStateValue'

const Container = styled.div`
  color: white;
  display: grid;
  grid-column-gap: 12px;
  grid-template-columns: repeat(2, calc(50% - 6px));
  margin-bottom: 12px;
`

const Dimensions = () => {
  const { state } = useStateValue()
  const { width, height } = state.inspector

  return (
    <Container>
      <Stat
        label="Width"
        value={width}
      />
      <Stat
        label="Height"
        value={height}
      />
    </Container>
  )
}

export default Dimensions