import React from 'react';
import Header from 'components/Sidebar/Header';
import Item from 'components/Sidebar/Item';
import { useStateValue } from 'hooks/useStateValue';

const Group = ({ index, text }) => {
  const { state } = useStateValue();
  const { sidebar } = state;
  return (
    <React.Fragment>
      <Header text={text} index={index} />
      {sidebar.headerCollapsed[index] && (
        <React.Fragment>
          <Item text="HeaderWithMenu" />
          <Item text="HeaderWithMenu" />
          <Item text="HeaderWithMenu" />
          <Item text="HeaderWithMenu" />
          <Item text="HeaderWithMenu" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Group;
