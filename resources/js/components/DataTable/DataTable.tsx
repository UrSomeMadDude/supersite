import * as React from "react";
import styles from "./datatable.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface IDataTable {
    options: string[];
}

export default function DataTable(props: IDataTable) {
    return (
        <div className={cx("datatable__container")}>
            {props.options.map((option) => (
                <a
                    key={option}
                    href={option}
                    className={cx("datatable__option")}
                >
                    <div>{option}</div>
                </a>
            ))}
        </div>
    );
}
