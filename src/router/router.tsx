import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import SignInUser from "../Protected/SignInUser";

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
        ],
    },
]);

export default router;
