export const addItem = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getItem = (name) => {
  const result = localStorage.getItem(name);
  return JSON.parse(result);
};

export const removeItem = (name) => {
  localStorage.removeItem(name);
};
