import React from 'react'
import ReactDOM from 'react-dom'
import Builder from 'components/Builder'
import { mainReducer } from 'reducers'
import { StateProvider } from 'state'

const App = () => {
  const initialState = {
    canvas: {
      zoomLevel: 1
    },
    sidebar: {
      mode: 'view-only',
      screens: [],
      selectedScreen: null,
      selectedComponent: null
    }
  }

  return (
    <StateProvider
      reducer={mainReducer}
      initialState={initialState}
    >
      <Builder />
    </StateProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
