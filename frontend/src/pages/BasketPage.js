import React, {useContext} from "react";
import {Col, Container, Row} from "react-bootstrap";
import FilterBar from "../components/FilterBar";
import TicketList from "../components/TicketsList";
import {Context} from "../index";
import {fetchCities} from "../http/CityApi";
import {fetchTickets} from "../http/TicketApi";
import {fetchBasketTickets} from "../http/BasketApi";
import {observer} from "mobx-react-lite";
import BasketList from "../components/BasketList";

const BasketPage = observer(() => {
    const {user, ticket} = useContext(Context);
    fetchCities().then(data => ticket.setCities(data.rows));
    fetchBasketTickets().then(data => user.setBasketTickets(data.rows));
    return (
        <Container>
            <BasketList/>
        </Container>
    )
});

export default BasketPage;