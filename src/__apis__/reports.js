import axiosInstance from "./axios";

export const reportsRequest = async () =>
  axiosInstance.get("/reports/reports-data").then((response) => response.data);
