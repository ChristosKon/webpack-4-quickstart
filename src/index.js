import React from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter } from 'react-router-dom'
import App from "./components/App";
import Nav from "./components/Nav";
import style from "./main.css";

ReactDOM.render(<Nav />, document.getElementById("nav"));
ReactDOM.render(<App />, document.getElementById("app"));

