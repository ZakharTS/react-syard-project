import React, {useContext} from "react";
import {Container} from "react-bootstrap";
import {Context} from "../index";
import {fetchCities} from "../http/CityApi";
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