import styled from '@emotion/styled'

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => !props.active ? '#929292' : '#ccc9cd'};
  height: 40px;
  width: 40px;
`

export default Button