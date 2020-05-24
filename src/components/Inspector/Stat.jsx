import React from 'react'
import styled from '@emotion/styled'

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 44px;
`

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
`

const StatValue = styled.div`
  background-color: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  line-height: 24px;
  width: calc(16px * 4);
  &::after {
    content: 'px';
  }
`

const Stat = (props) => {
  return (
    <StatContainer>
      <StatLabel>
        {props.label}
      </StatLabel>
      {props.value && (
        <StatValue>
          {props.value}
        </StatValue>
      )}
    </StatContainer>
  )
}

export default Stat