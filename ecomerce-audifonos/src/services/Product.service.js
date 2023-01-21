import axios from 'axios';
const URL_ROOT = process.env.REACT_APP_API_URL;

const getProducts = async (data) => {
    const response = await axios.get(`${URL_ROOT}/products`);
    return response.data;
};

const getProduct = async (id) => {
    const response = await axios.get(`${URL_ROOT}/products?id=${id}`);
    return response.data;
};

export { getProducts, getProduct };