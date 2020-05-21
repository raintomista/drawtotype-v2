export const getRandomNum = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(0);
}