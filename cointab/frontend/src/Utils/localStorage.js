const storeData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getData = (key) => {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch (e) {
    return undefined;
  }
};
const removeData = (key) => {
  localStorage.removeItem(key);
};

export { storeData, getData, removeData };
