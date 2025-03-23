import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <div className="flex flex-col">
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </div>
);
