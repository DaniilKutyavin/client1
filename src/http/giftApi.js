import { $authHost, $host } from ".";

export const createGift = async (gift) => {
    const { data } = await $authHost.post('api/gift/', gift);
    return data;
};

export const getGift = async () => {
    const { data } = await $host.get(`api/gift/`);
    return data;
};

export const updateGift = async (giftData) => {
    const { data }= await  $authHost.put('api/gift', giftData);
    return data;
};
