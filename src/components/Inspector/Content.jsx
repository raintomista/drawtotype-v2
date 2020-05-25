import React from 'react'
import styled from '@emotion/styled'
import ImageContent from 'components/Inspector/ImageContent'
import { useStateValue } from 'hooks/useStateValue'

const ContentWrapper = styled.div`
  padding: 16px;
`

const Content = () => {
  const { state } = useStateValue()
  const { screens } = state.sidebar
  const { selectedScreen, selectedComponent } = state.sidebar
  let component = null

  if (selectedScreen !== null && selectedScreen !== null) {
    component = screens[selectedScreen].components[selectedComponent]
  }

  return (
    <ContentWrapper>
      {component && (
        <ImageContent
          component={component}
          componentIndex={selectedComponent}
          screenIndex={selectedScreen}
        />
      )}
    </ContentWrapper>
  )
}

export default Content