import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../Provider/ThemeProvider";

export default function NotFound() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <Card className="p-8 shadow-lg w-[90%] max-w-md text-center">
                <CardContent>
                    <h1 className="text-4xl font-bold mb-2">404</h1>
                    <p className="text-lg text-muted-foreground">Page Not Found</p>
                    <Button asChild className="mt-4 w-full">
                        <Link to="/">Go Home</Link>
                    </Button>
                </CardContent>
            </Card>
            <Button variant="outline" className="mt-6" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
        </div>
    );
}
