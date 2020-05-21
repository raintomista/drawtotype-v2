import styled from '@emotion/styled'

const Wrapper = styled.div`
  max-height: 100vh;
  max-width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(40, 40, 40, 0.8);
    border-radius: 10px;
  }
`

export default Wrapper
