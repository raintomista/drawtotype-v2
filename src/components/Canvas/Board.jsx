import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import Image from 'components/Canvas/Image'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const Board = ({ components, screenIndex }) => {
  const { state, dispatch } = useStateValue();
  const [ selected, setSelected ] = useState(false);
  const elementRef = useRef();

  const { zoomLevel } = state.canvas;
  const { selectedScreen, selectedComponent } = state.sidebar;

  const getComponent = (component, componentIndex) => {
    switch(component.type) {
      case 'Image':
        return (
          <Image
            key={componentIndex}
            ref={{boardRef: elementRef}}
            config={component.config}
            componentIndex={componentIndex}
            screenIndex={screenIndex}
          />
        );
      default:
        return;
    }
  }

  const handleDragOver = event => {
    event.preventDefault(); // Allow dragging over the Board
  }

  const handleDrop = event => {
    event.preventDefault(); // Allow dropping over the Board
    
    const board = elementRef.current.getBoundingClientRect();
    const data = JSON.parse(event.dataTransfer.getData('new-component'));
    
    dispatch({
      type: types.SIDEBAR_ADD_COMPONENT,
      screenIndex: screenIndex,
      componentType: data.componentType,
      posX: event.clientX - board.x - data.offsetX,
      posY: event.clientY - board.y - data.offsetY
    });
  }

  const isSelected = () => {
    return selectedScreen === screenIndex
      && selectedComponent === null
  }

  useEffect(() => {
    setSelected(isSelected());
  }, [selectedScreen, selectedComponent]);

  const container = css`
    position: relative;
    background-color: #ffffff;
    max-height: calc(400px * ${zoomLevel});
    max-width: calc(250px * ${zoomLevel});
    min-height: calc(400px * ${zoomLevel});
    min-width: calc(250px * ${zoomLevel});
    padding: calc(12px * ${zoomLevel});
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    &:nth-of-type(n + 5) {
      margin-top: calc(20px * ${zoomLevel});
    }
    &:not(:nth-of-type(4n)) {
      margin-right: calc(20px * ${zoomLevel});
    }
  `

  return (
    <div
      css={container}
      ref={elementRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {components.map((component, index) =>
        getComponent(component, index)
      )}
    </div>
  );
}

export default Board