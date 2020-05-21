import {
  getRandomNum
} from './getRandomNum';

export const getScreens = () => {
  const numOfScreens = +getRandomNum(1, 5)
  return Array(numOfScreens).fill({}).map((screen, index) => {
    const numOfComponents = +getRandomNum(1, 5)
    const components = Array(numOfComponents).fill({})
      .map((component, index) => ({
        type: 'HeaderWithMenu'
      }))
    return ({
      name: `Screen ${index+1}`,
      collapsed: false,
      components: components
    })
  })
}