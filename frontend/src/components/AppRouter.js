import {Navigate, Route, Routes} from 'react-router-dom';
import {adminRoutes, publicRoutes, userRoutes} from "../routes";
import {useContext} from "react";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user);
    return (
        <Routes>
            {user.isAuth && userRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth && user.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={"/shop"}/>}/>
        </Routes>
    );
}

export default AppRouter;
