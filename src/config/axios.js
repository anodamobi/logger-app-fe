export const config = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};
