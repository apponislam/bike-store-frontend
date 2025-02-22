import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import SignInUser from "../Protected/SignInUser";
import AllProducts from "../components/AllProducts/AllProducts";
import ProductDetails from "../components/AllProducts/ProductDetails";

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
]);

export default router;
