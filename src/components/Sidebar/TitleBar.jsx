import React from 'react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  color: #ffffff;
  display: grid;
  font-size: 16px;
  font-weight: 500;
  grid-column-gap: 4px;
  grid-template-columns: 40px 1fr 40px;
  height: 40px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

const Text = styled.h2`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0px;
  text-align: center;
`;

const TitleBar = props => (
  <Wrapper>
    <Button>&#10094;</Button>
    <Text>{props.text}</Text>
    <Button>&#43;</Button>
  </Wrapper>
);

export default TitleBar;
