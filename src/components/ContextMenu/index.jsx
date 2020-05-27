import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'
import types from 'reducers/types'

const ContextMenu = () => {
  const visibleRef = useRef(false)
  const { dispatch } = useStateValue()
  const [state, setState] = useState({
    visible: false,
    target: null,
    posX: 0,
    posY: 0
  })

  const handleContextMenu = event => {
    event.preventDefault()
    if (event.target.dataset.allow === 'context-menu') {
      visibleRef.current = true
      setState({
        visible: true,
        target: event.target,
        posX: event.clientX,
        posY: event.clientY
      })
    }
  }

  const handleBlur = event => {
    event.preventDefault()
    if (visibleRef.current) {
      visibleRef.current = false
      setState({
        visible: false,
        target: null,
        posX: event.clientX,
        posY: event.clientY
      })
    }
  }

  const handleDuplicate = event => {
    const target = state.target
    switch(target.dataset.itemType) {
      case 'screen':
        return dispatch({
          type: types.SIDEBAR_DUPLICATE_SCREEN,
          screenIndex: parseInt(target.dataset.screenIndex)
        })
    }
  }

  const handleRename = event => {
  }

  const handleDelete = event => {
  }

  useEffect(() => {
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('click', handleBlur)

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('click', handleBlur)
    }
  }, [])

  const ContextMenu__ContextMenu = css`
    display: ${state.visible ? 'block': 'none'};
    position: absolute;
    left: ${state.posX + 'px'};
    top: ${state.posY + 'px'};
    z-index: 999;
    height: max-content;
    width: 150px;
    padding: 8px 0px;
    background-color: #292b2f;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
    color: rgba(255, 255, 255, 1);
  `

  const ContextMenu__ContextItem = css`
    font-size: 14px;
    padding: 8px 16px;
    user-select: none;
    &:hover {
      background-color: #288dfd;
    }
  `

  return (
    <div css={ContextMenu__ContextMenu}>
      <div
        css={ContextMenu__ContextItem}
        onClick={handleDuplicate}
      >
        Duplicate
      </div>
      <div
        css={ContextMenu__ContextItem}
        onClick={handleRename}
      >
        Rename
      </div>
      <div
        css={ContextMenu__ContextItem}
        onClick={handleDelete}
      >
        Delete
      </div>
    </div>
  )
}

export default ContextMenu