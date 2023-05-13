import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="/main" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
