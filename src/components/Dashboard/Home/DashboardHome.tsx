import { currentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";

const DashboardHome = () => {
    const user = useAppSelector(currentUser);
    // console.log(user);

    return (
        <div className="">
            <h1 className="text-3xl text-center mb-4 font-bold">Hi {user?.name}</h1>
            <p className="text-center text-xl">You can check your order status and you can update your profile here</p>
        </div>
    );
};

export default DashboardHome;
