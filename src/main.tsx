import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router.tsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Provider/ThemeProvider.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                    <RouterProvider router={router} />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);
