export const getValueByKey = (object, value) => {
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (parseInt(prop) === value) {
        return object[prop];
      }
    }
  }
};
