import React from 'react'
import styled from '@emotion/styled'

import Stat from 'components/Inspector/Stat'
import { useStateValue } from 'hooks/useStateValue'

const Container = styled.div`
  color: white;
  display: grid;
  grid-column-gap: 12px;
  grid-template-columns: repeat(2, calc(50% - 6px));
  padding: 16px 16px 6px 16px;
`

const Positioning = () => {
  const { state } = useStateValue()
  const { posX, posY } = state.inspector

  return (
    <Container>
      <Stat
        label="X"
        value={posX}
      />
      <Stat
        label="Y"
        value={posY}
      />
    </Container>
  )
}

export default Positioning