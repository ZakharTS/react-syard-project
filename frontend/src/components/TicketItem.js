import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Card, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {createBasketTicket, fetchOneBasketTicketByTicketId, removeOneBasketTicketByTicketId} from "../http/BasketApi";
import {fetchTickets, removeOneTicket} from "../http/TicketApi";

const TicketItem = observer(({curTicket}) => {
    const {ticket} = useContext(Context);
    const {user} = useContext(Context);
    const departureCity = ticket.cities.find(item => item.id === curTicket.departureCityId) || {};
    const arrivalCity = ticket.cities.find(item => item.id === curTicket.arrivalCityId) || {};
    const [isInBasket, setIsInBasket] = useState(false);

    try {
        if (user.isAuth) {
            fetchOneBasketTicketByTicketId(curTicket.id).then(data => setIsInBasket(data.id !== 0));
        }
    } catch (e) {
        alert(e.response.data.message);
    }

    const click = async () => {
        if (isInBasket) {
            try {
                await removeOneBasketTicketByTicketId(curTicket.id);
                setIsInBasket(false);
            } catch (e) {
                alert(e.response.data.message);
            }
        } else {
            try {
                await createBasketTicket(user.user.id, curTicket.id);
                setIsInBasket(true);
            } catch (e) {
                alert(e.response.data.message);
            }
        }
    }
    const removeTicket = async () => {
        try {
            await removeOneTicket(curTicket.id);
            await fetchTickets().then(data => ticket.setTickets(data.rows));
        } catch (e) {
            alert(e.response.data.message);
        }
    }
    return (
        <Row className="mt-3 flex-row">
            <Card style={{width: window.innerWidth - 54, cursor: "pointer"}} className="d-flex">
                <Form className="d-flex justify-content-between align-items-center">
                    <div className="m-3">{curTicket.name}<br/>{departureCity.name} - {arrivalCity.name}</div>
                    <div>{curTicket.departureTime} - {curTicket.arrivalTime}</div>
                    <div className="m-3">{curTicket.price} рублей</div>
                    {
                        user.isAuth ?
                            isInBasket ?
                                <Button variant={"outline-secondary"} onClick={click}>Добавлено в корзину</Button>
                                :
                                <Button variant={"outline-primary"} onClick={click}>В корзину</Button>

                            :
                            <></>
                    }
                    {
                        user.isAdmin ?
                            <Button variant={"outline-danger"} onClick={removeTicket}>Удалить</Button>
                            :
                            <></>
                    }
                </Form>
            </Card>
        </Row>
    );
});

export default TicketItem;