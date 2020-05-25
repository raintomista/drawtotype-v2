import React from 'react'
import styled from '@emotion/styled'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const ContentHeader = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-bottom: 8px;
`

const ContentInput = styled.input`
  background-color: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-left: -6px;
  padding: 6px;
  width: calc(100% + 12px);
`

const ImageContent = ({ component, componentIndex, screenIndex }) => {
  const { state, dispatch } = useStateValue()
  const { screens } = state.sidebar

  const handleChange = (event) => {
    const components = screens[screenIndex].components
    components[componentIndex].imageSrc = event.target.value.trim()
    screens[screenIndex].components = components

    dispatch({
      type: types.SIDEBAR_SET_SCREENS,
      screens
    })
  }

  return (
    <React.Fragment>
      <ContentHeader>
        Image
      </ContentHeader>
      <ContentInput
        placeholder="Selected Image"
        value={component.imageSrc}
        onChange={handleChange}
      />
    </React.Fragment>
  )
}

export default ImageContent