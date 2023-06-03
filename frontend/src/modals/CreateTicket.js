import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Dropdown, Form, FormControl, Modal} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import {Context} from "../index";
import {createCity, fetchCities} from "../http/CityApi";
import {createTicket} from "../http/TicketApi";

const CreateTicket = ({show, onHide}) => {
    const {ticket} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const submit = async () => {
        try {
            const data = await createTicket(name, price, departureCity.id, arrivalCity.id, departureTime, arrivalTime);
        } catch (e) {
            alert(e.response.data.message)
        }
        onHide();
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить билет
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className="m-2" placeholder={"Рейс"} minLength={4} maxLength={4}
                                  value={name} onChange={e => setName(e.target.value)}/>
                    <Dropdown className="m-2">
                        <DropdownToggle>{departureCity.name || "Город отправления..."}</DropdownToggle>
                        <DropdownMenu>
                            {ticket.cities.map(city =>
                                <DropdownItem onClick={() => setDepartureCity(city)} key={city.id}>{city.name}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Form.Control className="m-2" type="time"
                                  value={departureTime} onChange={e => setDepartureTime(e.target.value)}/>
                    <Dropdown className="m-2">
                        <DropdownToggle>{arrivalCity.name || "Город прибытия..."}</DropdownToggle>
                        <DropdownMenu>
                            {ticket.cities.map(city =>
                                <DropdownItem onClick={() => setArrivalCity(city)} key={city.id}>{city.name}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Form.Control className="m-2" type="time"
                                  value={arrivalTime} onChange={e => setArrivalTime(e.target.value)}/>
                    <Form.Control className="m-2" type="number" placeholder={"Цена"}
                                  value={price} onChange={e => setPrice(e.target.value)}/>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Отмена</Button>
                <Button variant={"outline-success"} onClick={submit}>Добавить</Button>

            </Modal.Footer>
        </Modal>
    )
};

export default CreateTicket;