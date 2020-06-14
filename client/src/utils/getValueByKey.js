export const getValueByKey = (object, value) => {
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (parseInt(prop) === parseInt(value)) {
        return object[prop];
      }
    }
  }
};
