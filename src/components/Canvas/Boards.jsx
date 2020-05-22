import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'

const Boards = ({ children }) => {
  const { state } = useStateValue()

  const zoomScaling = basePx =>
    `${basePx * state.canvas.zoomLevel}px`

  return (
    <div
      css={css`
        align-items: center;
        background-color: #151515;
        box-sizing: content-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        min-width: ${zoomScaling(1060)};
        max-width: ${zoomScaling(1060)};
        padding: 25%;
        width: max-content;
      `}
    >
      {children}
    </div>
  )
}

export default Boards
