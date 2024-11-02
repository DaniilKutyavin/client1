import { $authHost, $host } from ".";

export const createNews = async (product) => {
    const { data } = await $authHost.post('api/news/', product);
    return data;
};

export const getNews = async (id) => {
    const { data } = await $host.get(`api/news/`);
    return data;
};

export const getNewsOne = async (id) => {
    const { data } = await $host.get(`api/news/${id}`);
    return data;
};


