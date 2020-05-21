import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import Sidebar from 'components/Sidebar'
import { getScreens } from 'helpers/getScreens'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const BuilderWrapper = styled.aside`
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  background-color: #151515;
`

const Builder = () => {
  const { dispatch } = useStateValue()

  useEffect(() => {
    dispatch({
      type: types.SIDEBAR_SET_SCREENS,
      screens: getScreens()
    })
  }, [])

  return (
    <BuilderWrapper>
      <Sidebar />
    </BuilderWrapper>
  )
}

export default Builder
