import styles from "./dropdown.module.scss";
import { useRef } from "react";

const Dropdown = (props) => {
    const { className, active, setActive } = props;
    const dropDownRef = useRef(null);

    return (
        <>
            {active && (
                <div
                    className={styles.backDrop}
                    onClick={() => setActive(false)}
                />
            )}
            <div
                ref={dropDownRef}
                className={` ${styles.drop} ${
                    active && styles.show
                } ${className}`}
            >
                {props.children}
            </div>
        </>
    );
};

export default Dropdown;
