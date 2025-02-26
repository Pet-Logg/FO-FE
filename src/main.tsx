import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="font-gongbuFont text-2xl">
    <App />
  </div>
);
