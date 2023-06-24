import React, {useContext, useState} from "react";
import {Button, Card, Container, FloatingLabel, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {checkAuth, login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AuthPage = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === "/login";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const submit = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, name, password);
            }
            await checkAuth().then(data => {
                if (data) {
                    user.setUser(data.user);
                    user.setIsAuth(true);
                    if (data.user.role === 'admin') {
                        user.setIsAdmin(true);
                    }
                }
            });
            navigate("/shop");
        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 70}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Вход" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ? <></> :
                        <FloatingLabel
                            label="Имя"
                            className="m-1"
                        >
                            <Form.Control
                                placeholder="Имя"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </FloatingLabel>
                    }
                    <FloatingLabel
                        label="Email"
                        className="m-1"
                    >
                        <Form.Control
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Пароль"
                        className="m-1"
                    >
                        <Form.Control
                            placeholder="Пароль"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                    <Form className="d-flex justify-content-between m-1">

                        {isLogin ?
                            <NavLink to="/registration">Регистрация</NavLink>
                            :
                            <NavLink to="/login">Вход</NavLink>

                        }
                        <Button
                            className="align-self-end"
                            variant={"outline-success"}
                            onClick={submit}>
                            {isLogin ? "Войти" : "Зарегистрировать"}
                        </Button>
                    </Form>
                </Form>
            </Card>

        </Container>
    )
});

export default AuthPage;