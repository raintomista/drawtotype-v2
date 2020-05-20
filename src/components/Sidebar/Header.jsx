import React from 'react';
import styled from '@emotion/styled';

const HeaderWrapper = styled.div`
  background-color: #292b2f;
  color: #ffffff;
  display: grid;
  font-size: 16px;
  font-weight: 500;
  grid-column-gap: 12px;
  grid-template-columns: 40px 1fr 40px;
  height: 40px;
`;

const HeaderBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

const HeaderText = styled.h2`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0px;
`;

const Header = (props) => (
  <HeaderWrapper>
    <HeaderBtn>&darr;</HeaderBtn>
    <HeaderText>{props.text}</HeaderText>
  </HeaderWrapper>
);

export default Header;
