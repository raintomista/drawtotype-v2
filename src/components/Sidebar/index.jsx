import React from 'react';
import styled from '@emotion/styled';
import Group from 'components/Sidebar/Group';
import { useStateValue } from 'hooks/useStateValue';

const SidebarWrapper = styled.div`
  background-color: #211f27;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: scroll;
  width: 250px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Sidebar = () => {
  const { state } = useStateValue();
  return (
    <SidebarWrapper>
      {state.sidebar.screens.map((screen, index) => (
        <Group
          text={screen.name}
          items={screen.components}
          collapsed={screen.collapsed}
          index={index}
          key={index}
        />
      ))}
    </SidebarWrapper>
  );
};

export default Sidebar;
