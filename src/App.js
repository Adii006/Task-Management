import logo from "./logo.svg";
import "./App.css";
import { Calender } from "./Components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calender />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
