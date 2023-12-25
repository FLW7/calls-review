import styles from "./itemDropdown.module.scss";

const ItemDropDown = (props) => {
    const { onClick, widthTransform, className, ...othersProps } = props;

    const clickHandler = () => {
        onClick && onClick(props.value);
    };

    return (
        <p
            {...othersProps}
            onClick={clickHandler}
            className={`${styles.item} ${className}`}
        >
            {props.children}
        </p>
    );
};

export default ItemDropDown;
