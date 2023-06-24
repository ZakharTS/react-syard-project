import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._isAdmin = false;
        this._user = null;
        this._basketTickets = [];
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setIsAdmin(bool) {
        this._isAdmin = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setBasketTickets(basketTickets) {
        this._basketTickets = basketTickets;
    }

    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user;
    }

    get basketTickets() {
        return this._basketTickets;
    }
}