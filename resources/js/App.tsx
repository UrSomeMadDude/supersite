import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { getUserData, selectIsInitialized } from "./redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { routes } from "./routeConfig";

function App() {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        dispatch(
            getUserData({
                email: localStorage.getItem("userMail"),
            })
        );
    }, []);

    if (!isInitialized) {
        return null;
    }

    return (
        <Routes>
            <Route path={routes.base} element={<ProtectedRoutes />}>
                <Route
                    path={routes.base}
                    element={<Navigate to={routes.home} />}
                />
                <Route path={routes.home} element={<Home />} />
            </Route>
            <Route path={routes.login} element={<Login />} />
        </Routes>
    );
}

export default App;
