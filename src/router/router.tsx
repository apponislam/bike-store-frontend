import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
]);

export default router;
