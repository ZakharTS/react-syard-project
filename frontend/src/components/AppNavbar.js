import React, {useContext} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import UserProfile from "./UserProfile";

const AppNavbar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const logout = () => {
        user.setIsAuth(false);
        user.setIsAdmin(false);
        user.setUser(null);
        localStorage.setItem('token', '');
        navigate("/shop");
    }
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <NavLink style={{color: "white"}} to="/shop">Поехали!</NavLink>
                {user.isAuth ?
                    user.isAdmin ?
                        <Nav className="ml-auto">
                            <Button variant={"outline-light"} className="m-2"
                                    onClick={() => navigate("/admin")}>Админ</Button>
                            <Button variant={"outline-light"} className="m-2"
                                    onClick={() => navigate("/basket")}>Корзина</Button>
                            <UserProfile/>
                            <Button variant={"outline-light"} className="m-2"
                                    onClick={logout}>Выйти</Button>

                        </Nav>
                        :
                        <Nav className="ml-auto">
                            <Button variant={"outline-light"} className="m-2"
                                    onClick={() => navigate("/basket")}>Корзина</Button>
                            <UserProfile className="m-2"/>
                            <Button variant={"outline-light"} className="m-2"
                                    onClick={logout}>Выйти</Button>
                        </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button variant={"outline-light"} className="m-2"
                                onClick={() => navigate("/login")}>Войти</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default AppNavbar;