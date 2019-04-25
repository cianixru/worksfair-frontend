/**
 * @description formats the error response messages
 * @param { array } data
 * @returns { string } errorMessage
 */
export default (data) => {
  const errors = Object.values(data);
  const errorMessage = errors.reduce((error, arr) => {
    return `${error} ${arr[0]}`;
  }, '');
  return errorMessage;
};
