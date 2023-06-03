import {$authHost, $host} from "./index";
import jwt_decode from 'jwt-decode';

export const createTicket = async (name, price, departureCityId, arrivalCityId, departureTime, arrivalTime) => {
    try {
        const {data} = await $authHost.post('api/ticket/', {
            name, price,
            departureCityId, arrivalCityId, departureTime, arrivalTime
        });
        return data;
    } catch (e) {
        return null;
    }
}

export const fetchTicketsByCity = async (departureCityId, arrivalCityId) => {
    try {
        const {data} = await $host.get('api/ticket/', {params: {departureCityId, arrivalCityId}});
        return data;
    } catch (e) {
        return null;
    }
}

export const fetchTickets = async () => {
    try {
        const {data} = await $host.get('api/ticket/');
        return data;
    } catch (e) {
        return null;
    }
}

export const fetchOneTicket = async (id) => {
    try {
        const {data} = await $host.get('api/ticket/' + id);
        return data;
    } catch (e) {
        return null;
    }
}

export const removeOneTicket = async (id) => {
    try {
        await $authHost.delete('api/ticket/' + id);
    } catch (e) {
    }
}