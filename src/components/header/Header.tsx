import { currentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { routesConfig } from "../config/routes";
import { ModeToggle } from "../ui/ThemeButton";
import MainNav from "./MainNav";
import { UserMenu } from "./UserMenu";

const Header = () => {
    const user = useAppSelector(currentUser);

    return (
        <header className="container mx-auto z-50 bg-background">
            <div className="flex h-20 items-center justify-between py-6 px-6 md:px-0">
                <MainNav items={routesConfig.mainNav} />
                <nav className="flex items-center gap-5">
                    {user && <UserMenu />}
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Header;
