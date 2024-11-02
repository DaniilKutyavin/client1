import { $authHost, $host } from ".";

// Info functions
export const createinfo = async (info) => {
  const { data } = await $authHost.post("api/contact/info", info);
  return data;
};

export const getAllinfo = async () => {
  const { data } = await $host.get(`api/contact/info`);
  return data;
};

export const updateinfo = async (id, info) => {
  const { data } = await $authHost.put(`api/contact/info/${id}`, info);
  return data;
};

export const submitPartnershipForm = async (formData) => {
  const response = await $host.post("api/formone/", formData);
  return response.data;
};

export const getFormOne = async () => {
  const response = await $host.get("api/formone/");
  return response.data;
};

export const deleteinfo = async (id) => {
  const { data } = await $authHost.delete(`api/contact/info/${id}`);
  return data;
};

// User functions
export const createuser = async (user) => {
  const { data } = await $authHost.post("api/contact/user", user);
  return data;
};

export const getAlluser = async () => {
  const { data } = await $host.get(`api/contact/user`);
  return data;
};

export const updateuser = async (id, user) => {
  const { data } = await $authHost.put(`api/contact/user/${id}`, user);
  return data;
};

export const deleteuser = async (id) => {
  const { data } = await $authHost.delete(`api/contact/user/${id}`);
  return data;
};
