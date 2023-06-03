import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Card, Container, Dropdown, Form} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Context} from "../index";
import {fetchTickets, fetchTicketsByCity} from "../http/TicketApi";

const FilterBar = observer(() => {
    const {ticket} = useContext(Context);
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const cancel = () => {
        fetchTickets().then(data => ticket.setTickets(data.rows));
        setDepartureCity('');
        setArrivalCity('');
    }
    const filter = async () => {
        await fetchTicketsByCity(departureCity.id, arrivalCity.id).then(data => ticket.setTickets(data.rows));
    }
    return (
        <Container className="d-flex justify-content-center align-items-center m-2">
            <Card style={{width: window.innerWidth / 6}}>
                <Form className="d-flex flex-column">
                    <Dropdown className="m-2">
                        <DropdownToggle>{departureCity.name || "Город отправления..."}</DropdownToggle>
                        <DropdownMenu>
                            {ticket.cities.map(city =>
                                <DropdownItem onClick={() => setDepartureCity(city)}
                                              key={city.id}>{city.name}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className="m-2">
                        <DropdownToggle>{arrivalCity.name || "Город прибытия..."}</DropdownToggle>
                        <DropdownMenu>
                            {ticket.cities.map(city =>
                                <DropdownItem onClick={() => setArrivalCity(city)}
                                              key={city.id}>{city.name}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </Form>
                <Form className="d-flex justify-content-between m-1">
                    <Button variant={"outline-secondary"} onClick={cancel}>Сбросить</Button>
                    <Button variant={"outline-success"} onClick={filter}>Фильтр</Button>
                </Form>
            </Card>
        </Container>
    );
});

export default FilterBar;