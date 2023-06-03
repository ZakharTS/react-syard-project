import AdminPage from "./pages/AdminPage";
import BasketPage from "./pages/BasketPage";
import AuthPage from "./pages/AuthPage";
import ShopPage from "./pages/ShopPage";

export const userRoutes = [
    {
        path: '/basket',
        Component: BasketPage
    },
];

export const adminRoutes = [
    {
        path: '/admin',
        Component: AdminPage
    },
];

export const publicRoutes = [
    {
        path: '/shop',
        Component: ShopPage
    },
    {
        path: '/login',
        Component: AuthPage
    },
    {
        path: '/registration',
        Component: AuthPage
    },
];