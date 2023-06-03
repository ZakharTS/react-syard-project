import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Card, Col, Container, Row} from "react-bootstrap";
import TicketItem from "./TicketItem";
import {Context} from "../index";
import {fetchCities} from "../http/CityApi";

const TicketList = observer(() => {
    const {ticket} = useContext(Context);
    return (
        <Container className="align-items-center" >
            <Row className="d-flex">
                {
                    ticket.tickets.map(ticket => <TicketItem key={ticket.id} curTicket={ticket}/>)
                }
            </Row>
        </Container>
    );
});

export default TicketList;