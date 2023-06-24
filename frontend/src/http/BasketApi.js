import {$authHost} from "./index";

export const createBasketTicket = async (userId, ticketId) => {
    const {data} = await $authHost.post('api/basket/', {userId, ticketId});
    return data;
}

export const fetchBasketTickets = async () => {
    const {data} = await $authHost.get('api/basket/');
    return data;
}

export const fetchOneBasketTicket = async (id) => {
    const {data} = await $authHost.get('api/basket/' + id);
    return data;
}

export const fetchOneBasketTicketByTicketId = async (id) => {
    try {
        const {data} = await $authHost.get('api/basket/ticket/' + id);
        return data;
    } catch (e) {
        return null;
    }
}

export const removeOneBasketTicketByTicketId = async (id) => {
    try {
        await $authHost.delete('api/basket/ticket/' + id);
    } catch (e) {
    }
}