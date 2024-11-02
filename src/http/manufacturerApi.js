import { $authHost, $host } from ".";

export const getManufacturersByTypeOne = async () => {
  const { data } = await $host.get(`api/manufacturer/one`);
  return data;
};
export const getManufacturersByTypeTwo = async () => {
  const { data } = await $host.get(`api/manufacturer/two`);
  return data;
};
export const getManufacturersByTypeThree = async () => {
  const { data } = await $host.get(`api/manufacturer/three`);
  return data;
};

export const createManufacturerOne = async (manufacturerData) => {
  const { data } = await $host.post(`api/manufacturer/one`, manufacturerData);
  return data;
};
export const createManufacturerTwo = async (manufacturerData) => {
  const { data } = await $host.post(`api/manufacturer/two`, manufacturerData);
  return data;
};
export const createManufacturerThree = async (manufacturerData) => {
  const { data } = await $host.post(`api/manufacturer/three`, manufacturerData);
  return data;
};

export const deleteManufacturerOne = async (id) => {
  await $host.delete(`api/manufacturer/one/${id}`);
};
export const deleteManufacturerTwo = async (id) => {
  await $host.delete(`api/manufacturer/two/${id}`);
};
export const deleteManufacturerThree = async (id) => {
  await $host.delete(`api/manufacturer/three/${id}`);
};
