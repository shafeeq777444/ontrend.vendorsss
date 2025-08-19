import { StrictMode } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        style: {
                            background: "linear-gradient(to right, #0c4a6e, #0369a1, #0284c7)", // from-sky-900 via-sky-700 to-sky-600
                            color: "white",
                            borderRadius: "12px",
                            padding: "12px 16px",
                            fontSize: "14px",
                            fontWeight: "500",
                        },
                        success: {
                            iconTheme: {
                                primary: "#38bdf8", // sky-400
                                secondary: "white",
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#f87171", // red-400
                                secondary: "white",
                            },
                        },
                    }}
                />

                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    </StrictMode>
);
