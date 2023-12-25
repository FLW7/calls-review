import {
    LocaleProvider,
    DateRangeInput,
    AdaptivityProvider,
    ConfigProvider,
    AppRoot,
    IconButton,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { useEffect, useState } from "react";
import cl from "./calendar.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { callsSlice, initialState } from "../../../store/reducers/CallsSlice";
import { format } from "date-fns";

interface CalendarProps {
    className?: string;
}

const CalendarRange = ({ className }: CalendarProps) => {
    const dispatch = useAppDispatch();
    const { date_end, date_start } = useAppSelector(
        (state) => state.callsReducer
    );
    const { setDate, setDateType } = callsSlice.actions;

    const [value, setValue] = useState<Date[] | undefined>([
        new Date(),
        new Date(),
    ]);
    const [disablePast, setDisablePast] = useState(false);
    const [disableFuture, setDisableFuture] = useState(true);
    const [disablePickers, setDisablePickers] = useState(false);
    const [closeOnChange, setCloseOnChange] = useState(false);
    const [disableCalendar, setDisableCalendar] = useState(false);

    const changeHandler = (newValue?: Date[] | undefined) => {
        setValue(newValue);
        if (newValue) {
            const formattedDates = [
                newValue[0] ? format(newValue[0], "yyyy-MM-dd") : "",
                newValue[1] ? format(newValue[1], "yyyy-MM-dd") : "",
            ];

            if (formattedDates[0] && !formattedDates[1]) {
                formattedDates[1] = format(new Date(), "yyyy-MM-dd");
                setValue([newValue[0], new Date()]);
            }

            dispatch(setDate(formattedDates));
            dispatch(setDateType(null));
        } else {
            dispatch(setDate([initialState.date_start, initialState.date_end]));
            dispatch(setDateType(3));
        }
    };

    useEffect(() => {
        setValue([new Date(date_start), new Date(date_end)]);
    }, [date_end, date_start]);

    return (
        <AdaptivityProvider>
            <ConfigProvider appearance="light">
                <AppRoot mode={"partial"}>
                    <div className={className}>
                        <LocaleProvider value={"ru"}>
                            <DateRangeInput
                                className={cl.calendar}
                                value={value}
                                onChange={changeHandler}
                                disablePast={disablePast}
                                disableFuture={disableFuture}
                                closeOnChange={closeOnChange}
                                disablePickers={disablePickers}
                                disableCalendar={disableCalendar}
                            />
                        </LocaleProvider>
                    </div>
                </AppRoot>
            </ConfigProvider>
        </AdaptivityProvider>
    );
};

export default CalendarRange;
