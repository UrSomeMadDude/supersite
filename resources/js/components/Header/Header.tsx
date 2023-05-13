import React from "react";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { routes } from "../../routeConfig";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/auth/authSlice";

const cx = classNames.bind(styles);

function Header(): React.ReactElement<React.FC> {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logOut());
    };
    return (
        <div className={cx("header__container")}>
            <Link to={routes.home}>Главная</Link>
            <Button variant="outlined" size="large" onClick={handleLogout}>
                Выйти
            </Button>
        </div>
    );
}

export default Header;
