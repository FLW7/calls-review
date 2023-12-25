import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import CalendarRange from "../../assets/CalendarRange/CalendarRange";
import Dropdown from "../../assets/Dropdown/Dropdown";
import ItemDropDown from "../../assets/Dropdown/itemDropdown/itemDropdown";
import cl from "./dateSelector.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { callsSlice } from "../../../store/reducers/CallsSlice";
import formatDateRange from "../../../helpers/formatDateRange";

const DateSelector: FC = () => {
    const dispatch = useAppDispatch();
    const { setDateType } = callsSlice.actions;
    const { date_type, date_start, date_end } = useAppSelector(
        (state) => state.callsReducer
    );
    const [active, setActive] = useState(false);

    const listNames = useMemo(() => {
        return [
            { id: 3, name: "3 дня" },
            { id: 7, name: "Неделя" },
            { id: 31, name: "Месяц" },
            { id: 365, name: "Год" },
        ];
    }, []);

    const [title, setTitle] = useState<string | null>(null);

    useEffect(() => {
        const find = listNames.find((item) => item.id === date_type);
        if (date_type && find) {
            setTitle(find.name);
        } else {
            setTitle(formatDateRange(date_start, date_end));
        }
    }, [date_type, date_start, date_end, listNames]);

    const itemClickHandler = (value: number) => {
        dispatch(setDateType(value));
        setActive(false);
    };

    const arrowClickHandler = (value: "prev" | "next") => {
        const currentIndex = listNames.findIndex(
            (item) => item.id === date_type
        );
        if (currentIndex !== -1) {
            let newIndex: number;
            if (value === "prev") {
                newIndex =
                    (currentIndex - 1 + listNames.length) % listNames.length;
            } else {
                newIndex = (currentIndex + 1) % listNames.length;
            }
            const selectedElement = listNames[newIndex];
            dispatch(setDateType(selectedElement.id));
        } else {
            dispatch(setDateType(listNames[0].id));
        }
    };

    return (
        <div className={cl.dateSelector}>
            <div className={cl.dateSelector__header}>
                <button
                    className={`${cl.dateSelector__arrowBtnPrev}`}
                    onClick={() => arrowClickHandler("prev")}
                />
                <div
                    onClick={() => setActive((prev) => !prev)}
                    className={`${cl.dateSelector__title} ${
                        active && cl.active
                    }`}
                >
                    <span className={cl.dateSelector__titleIcon} />
                    <p className={cl.dateSelector__titleText}>{title}</p>
                </div>
                <button
                    className={`${cl.dateSelector__arrowBtnNext}`}
                    onClick={() => arrowClickHandler("next")}
                />
            </div>
            <Dropdown
                className={cl.dateSelector__drop}
                active={active}
                setActive={setActive}
            >
                <ItemDropDown
                    className={date_type === 3 && cl.dateSelector__selected}
                    value={3}
                    onClick={itemClickHandler}
                >
                    3 дня
                </ItemDropDown>
                <ItemDropDown
                    className={date_type === 7 && cl.dateSelector__selected}
                    value={7}
                    onClick={itemClickHandler}
                >
                    Неделя
                </ItemDropDown>
                <ItemDropDown
                    className={date_type === 31 && cl.dateSelector__selected}
                    value={31}
                    onClick={itemClickHandler}
                >
                    Месяц
                </ItemDropDown>
                <ItemDropDown
                    className={date_type === 365 && cl.dateSelector__selected}
                    value={365}
                    onClick={itemClickHandler}
                >
                    Год
                </ItemDropDown>
                <div className={cl.calendarBlock}>
                    <p className={cl.calendarBlock__title}>Указать даты</p>
                    <CalendarRange className={cl.calendarBlock__input} />
                </div>
            </Dropdown>
        </div>
    );
};

export default DateSelector;
