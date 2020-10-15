export default {
  clearForm(data) {
    Object.keys(data).forEach((key, index) => { // eslint-disable-line no-unused-vars
      // eslint-disable-next-line no-param-reassign
      data[key] = '';
    });
  },
  numberToString(num) {
    return Number(num).toLocaleString('en');
  },
};
