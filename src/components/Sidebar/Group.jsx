import React from 'react'
import Header from 'components/Sidebar/Header'
import Item from 'components/Sidebar/Item'

const Group = props => (
  <React.Fragment>
    <Header
      text={props.text}
      collapsed={props.collapsed}
      index={props.index}
    />
    {!props.collapsed &&
      props.items.map((item, index) => (
        <Item text={item.type} key={index} />
      ))}
  </React.Fragment>
)

export default Group
