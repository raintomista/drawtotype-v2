import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'

const Boards = ({ children }) => {
  const { state } = useStateValue()
  return (
    <div
      css={css`
        background-color: #151515;
        box-sizing: content-box;
        display: flex;
        min-width: 100vw;
        flex-wrap: wrap;
        padding: 20vw;
        transform: scale(${state.canvas.zoomLevel});
        width: max-content;
      `}
    >
      {children}
    </div>
  )
}

export default Boards
