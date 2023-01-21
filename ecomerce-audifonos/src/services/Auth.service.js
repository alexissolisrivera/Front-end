import axios from 'axios';
const URL_ROOT = process.env.REACT_APP_API_URL;
const loginService = async (data) => {
    console.log("loginService");
    const response = await axios.post(`${URL_ROOT}/auth/login`, data);
    return response.data;
};

const registerService = async (data) => {
    const response = await axios.post(`${URL_ROOT}/users`, data);
    return response.data;
};

const getProfile = async () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)}` }
    };
    const response = await axios.get(`${URL_ROOT}/users/profile`, config);
    return response.data;
};

const verifyingTokenService = async () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN)}` }
    };
    const response = await axios.get(`${URL_ROOT}/auth/verify`, config);
    return response.data;
};

export { loginService, registerService, getProfile, verifyingTokenService };