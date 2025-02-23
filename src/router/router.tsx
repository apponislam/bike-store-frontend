import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import SignInUser from "../Protected/SignInUser";
import AllProducts from "../components/AllProducts/AllProducts";
import ProductDetails from "../components/AllProducts/ProductDetails";
import Dashboard from "../components/Dashboard/Dashboard";
import DashboardHome from "../components/Dashboard/Home/DashboardHome";
import NonSignInUser from "../Protected/NonSignInUser";
import Profile from "../components/Dashboard/Profile/Profile";
import ManageUsers from "../components/Dashboard/ManageUsers/ManageUsers";
import ManageOrders from "../components/Dashboard/ManageOrders/ManageOrders";
import AdminRoute from "../Protected/AdminRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/login",
                element: (
                    <SignInUser>
                        <Login></Login>
                    </SignInUser>
                ),
            },
            {
                path: "/register",
                element: (
                    <SignInUser>
                        <Register></Register>
                    </SignInUser>
                ),
            },
            {
                path: "/products",
                element: <AllProducts></AllProducts>,
            },
            {
                path: "/product/:id",
                element: <ProductDetails />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <NonSignInUser>
                <Dashboard></Dashboard>
            </NonSignInUser>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>,
            },
            {
                path: "/dashboard/manage-users",
                element: (
                    <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/manage-orders",
                element: (
                    <AdminRoute>
                        <ManageOrders></ManageOrders>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/profile",
                element: <Profile></Profile>,
            },
        ],
    },
]);

export default router;
