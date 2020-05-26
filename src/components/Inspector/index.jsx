import React from 'React'
import styled from '@emotion/styled'
import Layout from 'components/Inspector/Layout'
import Content from 'components/Inspector/Content'
import { useSidebarState } from 'hooks/useStateValue'

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
  const { component } = useSidebarState()
  return (
    <Container>
      {component && (
        <React.Fragment>
          <Layout/>
          <Content/>
        </React.Fragment>
      )}
    </Container>
  )
}

export default Inspector