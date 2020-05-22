import React from 'react'
import Header from 'components/Sidebar/Header'
import Item from 'components/Sidebar/Item'

const Group = ({
  collapsed,
  components,
  dispatch,
  screenIndex,
  selectedScreen,
  selectedComponent,
  text
}) => (
  <React.Fragment>
    <Header
      collapsed={collapsed}
      screenIndex={screenIndex}
      text={text}
    />
    {!collapsed &&
      components.map((component, componentIndex) => (
        <Item
          key={componentIndex}
          componentIndex={componentIndex}
          dispatch={dispatch}
          screenIndex={screenIndex}
          selectedScreen={selectedScreen}
          selectedComponent={selectedComponent}
          text={component.type}
        />
      ))}
  </React.Fragment>
)

export default Group
