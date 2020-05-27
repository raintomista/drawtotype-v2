import React from 'react'
import ReactDOM from 'react-dom'
import Builder from 'components/Builder'
import ContextMenu from 'components/ContextMenu'
import { mainReducer } from 'reducers'
import { StateProvider } from 'state'
import { initState } from 'utils/initState'

const App = () => {
  const state = initState()

  return (
    <StateProvider
      reducer={mainReducer}
      initialState={state}
    > 
      <ContextMenu/>
      <Builder />
    </StateProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
