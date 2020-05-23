export const isSelectedComponent = (
  selectedScreen,
  selectedComponent,
  screenIndex,
  componentIndex
) => {
  return selectedScreen === screenIndex &&
    selectedComponent === componentIndex
}