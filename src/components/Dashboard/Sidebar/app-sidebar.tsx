import { Home, ShoppingBag, User, Users } from "lucide-react";

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";
import { cn } from "../../../lib/utils";
import { siteConfig } from "../../config/site";
import { useAppSelector } from "../../../redux/hooks";
import { currentUser } from "../../../redux/features/auth/authSlice";

// Menu items.

export function AppSidebar() {
    const user = useAppSelector(currentUser);
    // console.log(user);

    const items1 = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Manage Users",
            url: "/dashboard/manage-users",
            icon: Users,
        },
        {
            title: "Manage Orders",
            url: "/dashboard/manage-orders",
            icon: ShoppingBag,
        },
        {
            title: "Profile",
            url: "/dashboard/profile",
            icon: User,
        },
    ];

    const items2 = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Your Orders",
            url: "/dashboard/your-orders",
            icon: ShoppingBag,
        },
        {
            title: "Profile",
            url: "/dashboard/profile",
            icon: User,
        },
    ];

    let items;

    if (user?.role == "admin") {
        items = items1;
    } else if (user?.role == "customer") {
        items = items2;
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={cn("norican", "text-xl")}>{siteConfig.name}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items?.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
