import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";

interface SignInUserProps {
    children: ReactNode;
}

const SignInUser: React.FC<SignInUserProps> = ({ children }) => {
    const user = useAppSelector(currentUser);

    const location = useLocation();

    if (user && location.pathname === "/login") {
        const redirectPath = location.state?.from || "/";
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default SignInUser;
