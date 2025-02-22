import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";

interface SignInUserProps {
    children: ReactNode;
}

const SignInUser: React.FC<SignInUserProps> = ({ children }) => {
    const user = useAppSelector(currentUser);

    return user ? <Navigate to="/" replace /> : children;
};

export default SignInUser;
