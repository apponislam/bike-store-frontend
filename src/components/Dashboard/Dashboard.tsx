import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./Sidebar/app-sidebar";
import { ModeToggle } from "../ui/ThemeButton";

const Dashboard = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="p-3 flex items-center justify-between">
                    <SidebarTrigger />
                    <ModeToggle></ModeToggle>
                </div>
                <div className="p-3 pt-0">
                    <Outlet></Outlet>
                </div>
            </main>
        </SidebarProvider>
    );
};

export default Dashboard;
