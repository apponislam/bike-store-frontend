import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router.tsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Provider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>
);
