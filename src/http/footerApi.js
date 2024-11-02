import { $authHost, $host } from ".";

export const getAll = async () => {
    const { data } = await $host.get(`api/footer/`);
    return data; 
};

export const updateFooter  = async (updatefooter) => {
    const { data }= await  $authHost.put('api/footer', updatefooter);
    return data;
};