import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import { Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    login,
    register,
    selectEmail,
    selectError,
} from "../../redux/auth/authSlice";
import { routes } from "../../routeConfig";

const cx = classNames.bind(styles);

interface IFormData {
    email: string;
    password: string;
}

function Login() {
    const error = useAppSelector(selectError);
    const email = useAppSelector(selectEmail);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const initialValues: IFormData = {
        email: "",
        password: "",
    };

    const handleLogin = (obj: IFormData): void => {
        dispatch(
            login({
                email: obj.email,
                password: obj.password,
            })
        );
    };
    const handleRegister = (obj: IFormData): void => {
        dispatch(
            register({
                email: obj.email,
                password: obj.password,
            })
        );
    };

    useEffect(() => {
        if (email) {
            navigate(routes.home, { replace: true });
        }
    }, [email]);

    return (
        <div className={cx("login__container")}>
            {error && <div>{error}</div>}
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values) => handleLogin(values)}
            >
                {({ values, submitForm }) => (
                    <Form>
                        <div className={cx("login__form-container")}>
                            <div className={cx("login__form-container__field")}>
                                <Field
                                    name="email"
                                    as={TextField}
                                    label="Введите email"
                                    fullWidth
                                />
                            </div>
                            <div className={cx("login__container__field")}>
                                <Field
                                    name="password"
                                    as={TextField}
                                    type="password"
                                    label="Введите пароль"
                                    fullWidth
                                />
                            </div>
                            <Button
                                variant="contained"
                                onClick={submitForm}
                                sx={{
                                    width: "100%",
                                }}
                            >
                                Войти
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => handleRegister(values)}
                                sx={{
                                    width: "100%",
                                }}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
