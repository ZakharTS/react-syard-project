import {makeAutoObservable} from "mobx";

export default class TicketStore {
    constructor() {
        this._tickets = [];
        this._cities = [];
        makeAutoObservable(this);
    }

    setTickets(tickets) {
        this._tickets = tickets;
    }

    setCities(cities) {
        this._cities = cities;
    }

    get tickets() {
        return this._tickets
    }

    get cities() {
        return this._cities;
    }

}