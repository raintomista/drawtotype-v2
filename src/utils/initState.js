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
        components: [
          {
            type: 'Image',
            config: {
              content: {
                fileData: 'https://images.unsplash.com/photo-1590374585152-ca0e8194c0d6?auto=format&fit=crop&w=500&q=80',
                fileName: 'Office.jpg'
              },
              dimension: {
                height: '300px',
                width: '100px'
              },
              positioning: {
                posX: '12px',
                posY: '12px'
              }
            }
          }
        ]
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