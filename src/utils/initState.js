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
    screens: [
      {
        name: 'Screen 1',
        collapsed: false,
        components: []
      }
    ],
    selectedScreen: null,
    selectedComponent: null
  },
  toolbar: {
    currentTool: 'select'
  }
}

export const initState = () => {
  const savedState = localStorage.getItem('app-state')
  if (savedState) {
    return JSON.parse(savedState)
  } else {
    return initialState
  }
}