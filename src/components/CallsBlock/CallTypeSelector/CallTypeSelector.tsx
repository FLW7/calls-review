import { FC, memo, useEffect, useMemo, useState } from "react";
import Dropdown from "../../assets/Dropdown/Dropdown";
import ItemDropDown from "../../assets/Dropdown/itemDropdown/itemDropdown";
import cl from "./callTypeSelector.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { callsSlice } from "../../../store/reducers/CallsSlice";

const CallTypeSelector: FC = memo(() => {
    const dispatch = useAppDispatch();
    const { setType } = callsSlice.actions;
    const { in_out } = useAppSelector((state) => state.callsReducer);

    const [active, setActive] = useState(false);

    const [title, setTitle] = useState("");

    const listNames = useMemo(() => {
        return [
            { id: null, name: "Все типы" },
            { id: 1, name: "Входящие" },
            { id: 0, name: "Исходящие" },
        ];
    }, []);

    const itemClickHandler = (value: number | null) => {
        dispatch(setType(value));
        setActive(false);
    };

    useEffect(() => {
        const find = listNames.find((item) => item.id === in_out);
        if (find) {
            setTitle(find.name);
        } else {
            setTitle(listNames[0].name);
        }
    }, [in_out, listNames]);

    return (
        <div className={cl.callTypeSelector}>
            <div className={cl.callTypeSelector__header}>
                <div
                    onClick={() => setActive((prev) => !prev)}
                    className={`${cl.callTypeSelector__title} ${
                        active && cl.active
                    } ${in_out !== null && cl.blue}`}
                >
                    <p className={cl.callTypeSelector__titleText}>{title}</p>
                    <span className={cl.callTypeSelector__arrow} />
                </div>
            </div>

            <Dropdown active={active} setActive={setActive}>
                <ItemDropDown
                    className={in_out === null && cl.callTypeSelector__selected}
                    value={null}
                    onClick={itemClickHandler}
                >
                    Все типы
                </ItemDropDown>
                <ItemDropDown
                    className={in_out === 1 && cl.callTypeSelector__selected}
                    value={1}
                    onClick={itemClickHandler}
                >
                    Входящие
                </ItemDropDown>
                <ItemDropDown
                    className={in_out === 0 && cl.callTypeSelector__selected}
                    value={0}
                    onClick={itemClickHandler}
                >
                    Исходящие
                </ItemDropDown>
            </Dropdown>
        </div>
    );
});

export default CallTypeSelector;
