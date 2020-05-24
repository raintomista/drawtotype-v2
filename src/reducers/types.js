import * as inspector from 'reducers/inspector/types'
import * as sidebar from 'reducers/sidebar/types'
import * as toolbar from 'reducers/toolbar/types'

export default {
  ...inspector,
  ...sidebar,
  ...toolbar
}