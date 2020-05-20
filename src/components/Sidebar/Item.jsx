import React from 'react';
import styled from '@emotion/styled';

const ItemWrapper = styled.div`
  color: #ffffff;
  cursor: pointer;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  padding: 13px 13px 13px 26px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  &:active,
  &.active {
    background-color: #288dfd;
  }
`;

const Item = (props) => (
  <ItemWrapper className={props.className}>
    {props.text}
  </ItemWrapper>
);

export default Item;
