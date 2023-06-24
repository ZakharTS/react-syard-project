import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {createCity} from "../http/CityApi";

const CreateCity = ({show, onHide}) => {
    const [name, setName] = useState('');
    const submit = async () => {
        try {
            const data = await createCity(name);
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
                    Добавить город
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    value={name}
                    onChange={e => setName(e.target.value)}>
                    <Form.Control placeholder={"Название города"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Отмена</Button>
                <Button variant={"outline-success"} onClick={submit}>Добавить</Button>

            </Modal.Footer>
        </Modal>
    )
};

export default CreateCity;