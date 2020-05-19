import React from 'react';
import Header from 'components/Sidebar/Header';
import Item from 'components/Sidebar/Item';

const Group = (props) => (
  <React.Fragment>
    <Header text={props.text} />
    <Item text="HeaderWithMenu" />
    <Item text="HeaderWithMenu" />
    <Item text="HeaderWithMenu" />
    <Item text="HeaderWithMenu" />
    <Item text="HeaderWithMenu" />
  </React.Fragment>
);

export default Group;
