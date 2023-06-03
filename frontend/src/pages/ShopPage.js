import React, {useContext, useEffect} from "react";
import TicketList from "../components/TicketsList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCities} from "../http/CityApi";
import {fetchTickets} from "../http/TicketApi";
import FilterBar from "../components/FilterBar";
import {Col, Row} from "react-bootstrap";

const ShopPage = observer(() => {
    const {ticket} = useContext(Context);
    fetchCities().then(data => ticket.setCities(data.rows));
    fetchTickets().then(data => ticket.setTickets(data.rows));
    return (
        <Row>
            <Col md={2}>
                <FilterBar/>
            </Col>
            <Col md={10}>
                <TicketList/>
            </Col>
        </Row>

    )
});

export default ShopPage;