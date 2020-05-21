import React from 'react'
import styled from '@emotion/styled'
import { useStateValue } from 'hooks/useStateValue'

const Wrapper = styled.div`
  color: #ffffff;
  display: grid;
  font-size: 16px;
  font-weight: 500;
  grid-column-gap: 4px;
  grid-template-columns: 40px 1fr 40px;
  height: 40px;
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`

const Text = styled.h2`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0px;
  text-align: center;
`

const TitleBar = props => {
  const { dispatch } = useStateValue()
  const handleAdd = () => {
    dispatch({
      type: 'SIDEBAR_SET_MODE',
      mode: 'add-screen'
    })
  }
  return (
    <Wrapper>
      <Button>&#10094;</Button>
      <Text>{props.text}</Text>
      <Button onClick={handleAdd}>&#43;</Button>
    </Wrapper>
  )
}

export default TitleBar
