import { $authHost, $host } from ".";

export const getAll = async () => {
    const { data } = await $host.get(`api/delivery/`);
    return data; 
};
export const updateDelivery = async (deliveryData) => {
    const { data }= await  $authHost.put('/api/delivery', deliveryData);
    return data;
};