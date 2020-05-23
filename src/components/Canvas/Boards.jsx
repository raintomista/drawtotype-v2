import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'
import { zoomScaling } from 'utils/zoomScaling'

const Boards = (props) => {
  const { state } = useStateValue()
  const { zoomLevel } = state.canvas

  const style = css`
    align-items: center;
    background-color: #151515;
    box-sizing: content-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    min-width: ${zoomScaling(1060, zoomLevel)};
    max-width: ${zoomScaling(1060, zoomLevel)};
    padding: 25%;
    width: max-content;
  `

  return (
    <div css={style}>
      {props.children}
    </div>
  )
}

export default Boards
