import React from 'react';
import styled from '@emotion/styled';
import { useStateValue } from 'hooks/useStateValue';

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
  &.collapsed {
    transform: rotate(180deg);
  }
`;

const HeaderText = styled.h2`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0px;
`;

const Header = ({ index, text }) => {
  const { state, dispatch } = useStateValue();
  const handleToggle = () => {
    dispatch({
      type: 'TOGGLE_HEADER',
      index: index
    });
  };

  return (
    <HeaderWrapper>
      <HeaderBtn
        onClick={handleToggle}
        className={state.sidebar.headerCollapsed[index] ? 'collapsed' : ''}
      >
        &#x25BC;
      </HeaderBtn>
      <HeaderText>{text}</HeaderText>
    </HeaderWrapper>
  );
};

export default Header;
