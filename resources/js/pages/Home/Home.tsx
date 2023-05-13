import React from "react";
import styles from "./home.module.scss";
import classNames from "classnames/bind";
import DataTable from "../../components/DataTable/DataTable";
import MultipleSelect from "../../components/MultipleSelect";

const cx = classNames.bind(styles);

function Home(): React.ReactElement<React.FC> {
    return (
        <div className={cx("home__container")}>
            <h2>Проверить соответвие сайта</h2>
            <MultipleSelect options={["yes", "no"]} />
            <div className={cx("home__table")}>
                <DataTable options={["yes", "no"]} />
            </div>
        </div>
    );
}

export default Home;
