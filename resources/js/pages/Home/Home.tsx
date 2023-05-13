import React from "react";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import DataTable from "../../components/DataTable/DataTable";
import MultipleSelect from "../../components/MultipleSelect";
import { Button, Select, SelectChangeEvent } from "@mui/material";
import { Field, Form, Formik } from "formik";

const cx = classNames.bind(styles);

function Home(): React.ReactElement<React.FC> {
    return (
        <div className={cx("home__container")}>
            <h2>Проверить соответвие сайта</h2>

            <Formik
                enableReinitialize
                initialValues={{
                    links: [],
                }}
                onSubmit={(values) => console.log(values)}
            >
                {({ setFieldValue, submitForm }) => (
                    <Form>
                        <div className={cx("home__form")}>
                            <Field
                                name="links"
                                as={MultipleSelect}
                                label="Выберите URL"
                                options={["yes", "no"]}
                                onChange={(
                                    event: SelectChangeEvent<string[]>
                                ) => {
                                    const {
                                        target: { value },
                                    } = event;
                                    setFieldValue(
                                        "links",
                                        // On autofill we get a stringified value.
                                        typeof value === "string"
                                            ? value.split(",")
                                            : value
                                    );
                                }}
                            />
                            <Button
                                size="large"
                                variant="contained"
                                color="success"
                                onClick={submitForm}
                            >
                                Проверить сайты
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className={cx("home__table")}>
                <DataTable options={["yes", "no"]} />
            </div>
        </div>
    );
}

export default Home;
