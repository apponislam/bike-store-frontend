import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import { ReactNode } from "react";

interface SignInUserProps {
    children: ReactNode;
}

const AdminRoute: React.FC<SignInUserProps> = ({ children }) => {
    const user = useAppSelector(currentUser);
    console.log(user?.role);

    if (user && user?.role == "admin") {
        return children;
    }

    return <Navigate to="/" />;
};

export default AdminRoute;
