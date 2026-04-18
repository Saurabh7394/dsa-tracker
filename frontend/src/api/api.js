import axios from "axios";

const API = axios.create({
  baseURL: "https://dsa-tracker-opjw.onrender.com/api",
});

export default API;