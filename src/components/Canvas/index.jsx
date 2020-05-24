import React, { forwardRef, useEffect } from 'react'
import { useStateValue } from 'hooks/useStateValue'
import DocumentArea from 'components/Canvas/DocumentArea'
import Container from 'components/Canvas/Container'
import Boards from 'components/Canvas/Boards'
import Board from 'components/Canvas/Board'

const Canvas =  forwardRef((props, ref) => {
  const { state  } = useStateValue()
  const { currentTool } = state.toolbar

  let isMouseDown = false
  let startX, startY, scrollLeft, scrollTop

  
  const handleMouseDown = e => {
    e.preventDefault()
    if (currentTool === 'hand') {
      const { offsetTop, offsetLeft } = ref.current
      isMouseDown = true
      startX = e.pageX - offsetLeft
      startY = e.pageY - offsetTop
      scrollLeft = ref.current.scrollLeft
      scrollTop = ref.current.scrollTop
    }
  }
  
  const handleMouseUp = e => {
    e.preventDefault()
    if (currentTool === 'hand') {
      isMouseDown = false
    }
  }
  
  const handleMouseLeave = e => {
    e.preventDefault()
    if (currentTool === 'hand') {
      isMouseDown = false
    }
  }

  const handleMouseMove = e => {
    e.preventDefault()
    const { offsetTop, offsetLeft } = ref.current
    
    if (currentTool === 'hand') {
      if (!isMouseDown) return
      const x = e.pageX - offsetLeft
      const y = e.pageY - offsetTop
      const walkX = (x - startX) * 1.5
      const walkY = (y - startY) * 1.5
      ref.current.scrollLeft = scrollLeft - walkX
      ref.current.scrollTop = scrollTop - walkY
    }
  }

  const maintainScrollToCenter = () => {
    const { clientHeight, clientWidth, scrollHeight, scrollWidth } = ref.current
    ref.current.scrollTop = (scrollHeight - clientHeight) / 2
    ref.current.scrollLeft = (scrollWidth - clientWidth) / 2
  }
  
  useEffect(() => {
    maintainScrollToCenter()
  }, [])

  return (
    <Container
    ref={ref}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <DocumentArea>
        <Boards>
          {state.sidebar.screens.map((screen, screenIndex) => (
            <Board
              key={screenIndex}
              screenIndex={screenIndex}
              components={screen.components}
            />
          ))}
        </Boards>
      </DocumentArea>
    </Container>
  )
})

export default Canvas
