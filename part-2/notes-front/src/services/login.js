import axios from "axios";
const baseUrl = "/api/notes";



const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default {
  login,
};
