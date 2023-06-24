import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Container, Row} from "react-bootstrap";
import TicketItem from "./TicketItem";
import {Context} from "../index";

const TicketList = observer(() => {
    const {ticket} = useContext(Context);
    return (
        <Container className="align-items-center">
            <Row className="d-flex">
                {
                    ticket.tickets.map(ticket => <TicketItem key={ticket.id} curTicket={ticket}/>)
                }
            </Row>
        </Container>
    );
});

export default TicketList;