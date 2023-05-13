import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";
import classNames from "classnames/bind";
import { Button, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/auth/authSlice";

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const initialValues = {
        email: "",
        password: "",
    };

    return (
        <div className={cx("login__container")}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={(values) =>
                    dispatch(
                        login({
                            email: values.email,
                            password: values.password,
                        })
                    )
                }
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
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
