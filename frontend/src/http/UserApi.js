import {$authHost, $host} from "./index";

export const registration = async (email, name, password) => {
    const {data} = await $host.post('api/user/registration', {email, name, password});
    localStorage.setItem('token', data.token);
    return data;
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return data;
}

export const checkAuth = async () => {
    try {
        const {data} = await $authHost.get('api/user/me');
        return data;
    } catch (e) {
        console.log(e.response.data.message);
        return null;
    }
}