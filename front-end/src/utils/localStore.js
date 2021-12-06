/**
 * @description Returns token from localStorage if the user is authorized
 * @returns {string|null} token
 */
export const getToken = () => {
  const token = localStorage.getItem('token');

  return token;
};
