import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"
import store from "../src/redux/store.js"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Provider store={store}><App /></Provider>);