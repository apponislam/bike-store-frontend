import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";

interface SignInUserProps {
    children: ReactNode;
}

const NonSignInUser: React.FC<SignInUserProps> = ({ children }) => {
    const user = useAppSelector(currentUser);
    const location = useLocation();

    return user ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default NonSignInUser;
