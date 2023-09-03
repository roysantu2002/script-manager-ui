import axios from "axios";

// Define your base API URL
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "";

console.log(BASE_API_URL);
// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
});

export default axiosInstance;
