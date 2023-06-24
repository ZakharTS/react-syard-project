import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Container, Row} from "react-bootstrap";
import TicketItem from "./TicketItem";
import {Context} from "../index";

const TicketList = observer(() => {
    const {user} = useContext(Context);
    return (
        <Container className="align-items-center">
            <Row className="d-flex">
                {
                    user.basketTickets.map(basketTicket => <TicketItem key={basketTicket.id}
                                                                       curTicket={basketTicket.ticket}/>)
                }
            </Row>
        </Container>
    );
});

export default TicketList;