import {
  getRandomNum
} from './getRandomNum';

const getRandomComponent = () => {
  const componentTypes = ['Image', 'FAB'];
  return componentTypes[0]
}

export const getScreens = () => {
  const numOfScreens = +getRandomNum(1, 1)
  return Array(numOfScreens).fill({}).map((screen, index) => {
    const numOfComponents = +getRandomNum(1, 5)
    const components = Array(numOfComponents).fill({})
      .map((component, index) => ({
        type: getRandomComponent(),
        imageSrc: 'https://images.unsplash.com/photo-1590004770788-e94b5b222cd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=797&q=80',
      }))
    return ({
      name: `Screen ${index+1}`,
      collapsed: false,
      components: components
    })
  })
}