import axios from "axios";
import { object } from "prop-types";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject, id) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update, deleteOne };
