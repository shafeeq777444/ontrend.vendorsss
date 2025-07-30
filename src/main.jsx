import { StrictMode } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                 <ReactQueryDevtools initialIsOpen={false} />
                <Toaster position="bottom-center" />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    </StrictMode>
);
