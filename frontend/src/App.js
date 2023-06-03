import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AppNavbar from "./components/AppNavbar";
import {Context} from "./index";
import {checkAuth} from "./http/UserApi";
import {Spinner} from "react-bootstrap";

function App() {
    const {user} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);

    try {
        checkAuth().then(data => {
            if (data) {
                user.setUser(data.user);
                user.setIsAuth(true);
                if (data.user.role === 'admin') {
                    user.setIsAdmin(true);
                }
            }
        }).finally(() => setIsLoading(false))
    } catch (e) {
        alert(e.response.data.message);
    }
    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }
    return (
        <BrowserRouter>
            <AppNavbar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
