import { css } from '@emotion/core'
import { useStateValue } from 'hooks/useStateValue'
import { zoomScaling } from 'utils/zoomScaling'

const Boards = (props) => {
  const { state } = useStateValue()
  const { zoomLevel } = state.canvas

  const style = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: content-box;
    justify-content: center;
    min-width: ${zoomScaling(1060, zoomLevel)};
    max-width: ${zoomScaling(1060, zoomLevel)};
    width: max-content;
  `

  return (
    <div
      css={style}
      data-deselect={true}
    >
      {props.children}
    </div>
  )
}

export default Boards
