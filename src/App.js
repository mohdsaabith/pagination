import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import Home from "./components/Home";

const baseUrl = "https://api.jikan.moe/v4/anime?";

function App() {
  return <Home />;
}

export default App;
