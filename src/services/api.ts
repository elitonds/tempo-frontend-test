import axios from "axios";

export const BASE_URL =
  "https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/";

export const api = axios.create({
  baseURL: BASE_URL,
});
