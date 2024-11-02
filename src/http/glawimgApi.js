// src/http/glavImgApi.js

import { $authHost, $host } from ".";
export const getGlavImgs = async () => {
  const { data } = await $host.get("/api/img/");
  return data;
};

export const addGlavImg = async (formData) => {
  const { data } = await $authHost.post("api/img", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteGlavImg = async (id) => {
  const { data } = await $authHost.delete(`/api/img/${id}`);
  return data;
};
