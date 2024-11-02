import { $authHost, $host } from ".";

export const createProductSZR = async (product) => {
  const { data } = await $authHost.post("api/product/szr", product);
  return data;
};

export const createProductUDO = async (product) => {
  const { data } = await $authHost.post("api/product/udo", product);
  return data;
};

export const createProductPOS = async (product) => {
  const { data } = await $authHost.post("api/product/pos", product);
  return data;
};

export const getProduct = async (id) => {
  const { data } = await $host.get(`api/product/${id}`);
  return data;
};
export const deleteBasketItem = async (productId) => {
  const { data } = await $authHost.delete(`api/basket/remove/${productId}`);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await $authHost.delete(`api/product/${id}`);
  return data;
};

export const getProductsByType = async (typeId) => {
  const { data } = await $host.get(`api/product/type/${typeId}`);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await $authHost.put(`api/product/${id}`, product);
  return data;
};

export const addToBasket = async (productId, quantity) => {
  const { data } = await $authHost.post("api/basket/add", {
    productId,
    quantity,
  });
  return data;
};

export const buyProduct = async (formData) => {
  const { data } = await $authHost.post("/api/buy", formData);
  return data;
};

export const deletebuyProduct = async (id) => {
  const { data } = await $authHost.delete(`api/buy/${id}`);
  return data;
};

export const getProductsByManufacturer = async (manufacturerName) => {
  const { data } = await $host.get(
    `api/product/manufacturer/${manufacturerName}`
  );
  return data;
};

export const getbuyProduct = async () => {
  const { data } = await $host.get(`api/buy`);
  return data;
};

export const getBasket = async (userId) => {
  try {
    const { data } = await $authHost.get("api/basket/get", { userId });
    return data;
  } catch (error) {
    console.error("Error fetching basket:", error);
    throw error; // or handle the error as you see fit
  }
};

// Функция очистки корзины
export const clearBasket = async () => {
  const { data } = await $authHost.delete("api/basket/clear");
  return data;
};

export const updateBasketItem = async (userId, productId, updatedData) => {
  const { quantity } = updatedData; // Destructure to get quantity
  const { data } = await $authHost.put(`api/basket/update`, {
    productId,
    quantity,
  }); // Send productId and quantity
  return data;
};

export const createOreders = async (order) => {
  const { data } = await $authHost.post("api/orders", order);
  return data;
};

export const getOrdersByUser = async () => {
  const { data } = await $authHost.get("api/orders/orders/user");
  return data;
};

export const getOrders = async () => {
  const { data } = await $authHost.get("api/orders/");
  return data;
};

export const updateOrder = async (id, orderData) => {
  const { data } = await $authHost.put(`api/orders/${id}`, orderData);
  return data; 
};

export const checkGiftAvailability = async (giftIds) => {
  const { data } = await $authHost.post("api/orders/check-gift-availability", { giftIds });
  return data;
};