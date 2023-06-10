export const getBackupOrders = ({ data }) => {
  const extractedData = data.map(order => order.toJSON());

  return extractedData.map(order => `${order.name} ${order.count} = ${order.price}`).join('\n');
};
