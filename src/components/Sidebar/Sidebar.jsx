import React from 'react';
import styled from '@emotion/styled';
import Group from 'components/Sidebar/Group';

const SidebarWrapper = styled.div`
  background-color: #211f27;
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: scroll;
  width: 250px;
`;

const Sidebar = () => (
  <SidebarWrapper>
    <Group text="Screen 1" />
    <Group text="Screen 2" />
    <Group text="Screen 3" />
    <Group text="Screen 4" />
  </SidebarWrapper>
);

export default Sidebar;
