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
    inspector: {
      posX: null,
      posY: null,
      height: null,
      width: null
    },
    sidebar: {
      mode: 'view-only',
      screens: [],
      selectedScreen: null,
      selectedComponent: null
    },
    toolbar: {
      currentTool: 'hand'
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
