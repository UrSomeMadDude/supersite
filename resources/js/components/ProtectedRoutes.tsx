import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { selectEmail } from "../redux/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { routes } from "../routeConfig";
import Header from "./Header/Header";

function ProtectedRoutes() {
    const email = useAppSelector(selectEmail);
    return email ? (
        <>
            <Header /> <Outlet />
        </>
    ) : (
        <Navigate to={routes.login} />
    );
}

export default ProtectedRoutes;
