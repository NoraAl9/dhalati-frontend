import axiosInstance from "./axios";

export const lostItemsRequest = async () =>
  axiosInstance
    .get(`/items/items-data?reportType=${"lost-item"}`)
    .then((response) => response.data);

export const foundItemsRequest = async () =>
  axiosInstance
    .get(`/items/items-data?reportType=${"found-item"}`)
    .then((response) => response.data);

export const itemDetailsRequest = async (itemId) =>
  axiosInstance
    .get(`/items/item-data/${itemId}`)
    .then((response) => response.data);
