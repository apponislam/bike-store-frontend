import { routesConfig } from "../config/routes";
import { ModeToggle } from "../ui/ThemeButton";
import MainNav from "./MainNav";

const Header = () => {
    return (
        <header className="container mx-auto z-50 bg-background">
            <div className="flex h-20 items-center justify-between py-6 px-6 md:px-0">
                <MainNav items={routesConfig.mainNav} />
                <nav className="flex items-center gap-5">
                    {/* <Link
                            href={"https://github.com/apponislam"}
                            target="_blank"
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                }),
                                "h-8 w-8 px-0"
                            )}
                        >
                            <Icons.gitHub className="w-5 h-5" />
                        </Link> */}
                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Header;
