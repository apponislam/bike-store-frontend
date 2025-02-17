import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import "@fontsource/norican/400.css";
import { siteConfig } from "../config/site";
import { useEffect, useState } from "react";
import { Icons } from "../ui/Icons";
import MobileNav from "./MobileNav";

interface MainNavProps {
    items?: any[];
    children?: React.ReactNode;
}

// const norican = Norican({
//     weight: ["400"],
//     style: ["normal"],
//     subsets: ["latin"],
//     display: "swap",
// });

// const norican = {
//     fontFamily: "'Norican', cursive",
//     fontWeight: 400, // Use weight "400"
//     fontStyle: "normal", // Style: "normal"
// };

const MainNav = ({ items, children }: MainNavProps) => {
    const location = useLocation();
    const pathname = location.pathname;
    const segment = pathname.split("/").filter(Boolean);

    // const segment = useSelectedLayoutSegment();
    // const pathname = usePathname();
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    useEffect(() => {
        setShowMobileMenu(false);
    }, [pathname]);

    return (
        <div className="flex gap-6 md:gap-10">
            <Link to="/" className="hidden items-center space-x-2 md:flex">
                <span className={cn("norican", "text-2xl")}>{siteConfig.name}</span>
            </Link>
            {items?.length ? (
                <nav className="hidden gap-6 md:flex">
                    {items?.map((item, index) => (
                        <Link key={index} to={item.disabled ? "#" : item.href} className={cn("flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm", item.href.startsWith(`/${segment}`) ? "text-foreground" : "text-foreground/60", item.disabled && "cursor-not-allowed opacity-80")}>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            ) : null}
            <button className="flex items-center space-x-2 md:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                {showMobileMenu ? <Icons.close /> : <Icons.menu />}
                <span className="font-bold">Menu</span>
                {/* <span className={cn(norican.className, "font-bold")}>Menu</span> */}
            </button>
            {showMobileMenu && items && <MobileNav items={items}>{children}</MobileNav>}
        </div>
    );
};

export default MainNav;
