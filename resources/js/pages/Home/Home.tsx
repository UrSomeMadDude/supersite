import React, { useEffect } from "react";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import DataTable from "../../components/DataTable/DataTable";
import MultipleSelect from "../../components/MultipleSelect";
import { Button, Select, SelectChangeEvent } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    getLinks,
    selectCurrentLinks,
    selectSiteLinks,
    sendLinks,
} from "../../redux/links/linkSlice";

const cx = classNames.bind(styles);

function Home(): React.ReactElement<React.FC> {
    const dispatch = useAppDispatch();
    const siteLinks = useAppSelector(selectSiteLinks);
    const currentLinks = useAppSelector(selectCurrentLinks);

    useEffect(() => {
        dispatch(getLinks());
    }, [dispatch]);

    const handleSaveLinks = async (links: string[]): Promise<void> => {
        await dispatch(sendLinks(links));
        dispatch(getLinks());
    };

    return (
        <div className={cx("home__container")}>
            <h2>Проверить соответвие сайта</h2>

            <Formik
                enableReinitialize
                initialValues={{
                    links: [],
                }}
                onSubmit={(values: string[]) =>
                    handleSaveLinks(
                        currentLinks && values.length === 0
                            ? currentLinks
                            : values
                    )
                }
            >
                {({ setFieldValue, submitForm }) => (
                    <Form>
                        <div className={cx("home__form")}>
                            <Field
                                name="links"
                                as={MultipleSelect}
                                label="Выберите URL"
                                options={siteLinks}
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
                <DataTable options={siteLinks} />
            </div>
        </div>
    );
}

export default Home;
