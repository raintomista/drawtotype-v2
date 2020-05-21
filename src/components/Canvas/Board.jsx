import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const HeaderWithMenu = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  padding: 12px;
  background-color: blue;
  color: white;
  line-height: 16px;
`

const Image = styled.img`
  background: #cecece;
  margin: 12px;
  padding-top: calc((100% - 24px) * (3 / 4));
  width: calc(100% - 24px);
`

const FAB = styled.button`
  background-color: blue;
  border: none;
  border-radius: 100%;
  position: sticky;
  bottom: 12px;
  left: calc(100% - 12px);
  margin: 12px;
  color: white;
  height: 35px;
  width: 35px;
`

const BoardWrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #000000;
  position: relative;
  height: 400px;
  overflow-y: scroll;
  width: 250px;
  &::-webkit-scrollbar {
    display: none;
  }
  &:nth-of-type(n + 5) {
    margin-top: 20px;
  }
  &:not(:nth-of-type(4n)) {
    margin-right: 20px;
  }
`

const Board = () => (
  <BoardWrapper>
    <HeaderWithMenu>Hhahah</HeaderWithMenu>
    <Image />
    <Image />
    <Image />
    <Image />
    <FAB />
  </BoardWrapper>
)

export default Board
