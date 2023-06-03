import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode';

export const createCity = async (name) => {
    const {data} = await $authHost.post('api/city', {name});
    return data;
}

export const fetchCities = async () => {
    const {data} = await $host.get('api/city');

    return data;
}

export const fetchOneCity = async (id) => {
    const {data} = await $host.get('api/city' + id);

    return data;
}