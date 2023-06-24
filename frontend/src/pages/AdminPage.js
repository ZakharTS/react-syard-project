import React, {useContext, useState} from "react";
import {Button, Container} from "react-bootstrap";
import CreateTicket from "../modals/CreateTicket";
import CreateCity from "../modals/CreateCity";
import {Context} from "../index";
import {fetchCities} from "../http/CityApi";
import {observer} from "mobx-react-lite";

const AdminPage = observer(() => {
    const [ticketVisible, setTicketVisible] = useState(false);
    const [cityVisible, setCityVisible] = useState(false);
    const {ticket} = useContext(Context);
    try {
        fetchCities().then(data => ticket.setCities(data.rows));
    } catch (e) {
    }
    return (
        <Container className="d-flex flex-column justify-content-center">
            <Button variant={"outline-dark"} className="mt-2" onClick={() => {
                setTicketVisible(true);
            }
            }>Добавить билет</Button>
            <Button variant={"outline-dark"} className="mt-2" onClick={() => setCityVisible(true)}>Добавить
                город</Button>
            <CreateTicket show={ticketVisible} onHide={() => setTicketVisible(false)}/>
            <CreateCity show={cityVisible} onHide={() => setCityVisible(false)}/>
        </Container>
    )
});

export default AdminPage;