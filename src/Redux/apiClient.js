import axios from "axios";

export const getOptions = async (url) => {
  return await axios.get(url);
};

export const postOptions = async (url, data) => {
  return await axios.post(url, JSON.stringify(data), {
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const putOptions = async (url, id, data) => {
  return await axios.put(`${url}/${id}`, JSON.stringify(data), {
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
};

export const deleteOptions = async (url, id) => {
  return await axios.delete(`${url}/${id}`);
};
