export default value => {
  const result = value > 0.001 || value < -0.001 ? value.toFixed(2) : value.toFixed(10);

  return result;
};
