import React from 'react'
import Header from 'components/Sidebar/Header'
import Item from 'components/Sidebar/Item'
import { useStateValue } from 'hooks/useStateValue'

const Group = ({ collapsed, components, screenIndex, text }) => {
  const { state, dispatch } = useStateValue();
  const { selectedScreen, selectedComponent } = state.sidebar
  
  return (
    <React.Fragment>
      <Header
        collapsed={collapsed}
        dispatch={dispatch}
        screenIndex={screenIndex}
        text={text}
      />
      {!collapsed &&
        components.map((component, componentIndex) => (
          <Item
            key={componentIndex}
            itemText={component.name}
            screenIndex={screenIndex}
            componentIndex={componentIndex}
          />
        ))}
    </React.Fragment>
  )
}

export default Group
