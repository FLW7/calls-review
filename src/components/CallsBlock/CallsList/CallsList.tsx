import React, { FC, useCallback, useEffect, useState } from "react";
import { ICall } from "../../../models/ICall";
import CallItem from "../CallItem/CallItem";
import cl from "./callstList.module.scss";
import dateFormatter from "../../../helpers/dateFormatter";
import { callsApi } from "../../../services/CallsService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Loader from "../../assets/loader/Loader";
import ErrorPlug from "../../assets/ErrorPlug/ErrorPlug";
import EmptyPlug from "../../assets/EmptyPlug/EmptyPlug";
import { callsSlice } from "../../../store/reducers/CallsSlice";
import { AudioProvider } from "../../assets/AudioPlayer/AudioContext/AudioContext";

const CallsList: FC = () => {
    const dispatch = useAppDispatch();
    const {
        date_end,
        date_start,
        in_out,
        limit,
        sort_by,
        date_order,
        duration_order,
    } = useAppSelector((state) => state.callsReducer);
    const { setSort } = callsSlice.actions;

    const [getCalls, { isError, isLoading, data }] =
        callsApi.useFetchAllPostsMutation({});

    const handleTimeSort = () => {
        let order;
        if (date_order === "ASC") {
            order = "DESC";
        } else order = "ASC";
        dispatch(
            setSort({
                sort_by: "date",
                order: order,
            })
        );
    };
    const handleDurationSort = () => {
        let order;
        if (duration_order === "ASC") {
            order = "DESC";
        } else order = "ASC";
        dispatch(
            setSort({
                sort_by: "duration",
                order: order,
            })
        );
    };

    const fetchCalls = useCallback(async () => {
        await getCalls({
            date_start,
            date_end,
            in_out,
            limit,
            sort_by,
            order: sort_by === "date" ? date_order : duration_order,
        });
    }, [
        date_start,
        date_end,
        in_out,
        limit,
        getCalls,
        sort_by,
        date_order,
        duration_order,
    ]);

    useEffect(() => {
        fetchCalls();
    }, [date_end, date_start, in_out, limit, fetchCalls]);

    const uniqueDates = Array.from(
        new Set(data?.results.map((item) => dateFormatter(item.date)))
    );

    return (
        <>
            <table className={cl.callsTable}>
                <tbody className={cl.callsTable__body}>
                    <tr className={cl.callsTable__headRow}>
                        <th className={cl.callsTable__head}>Тип</th>
                        <th className={cl.callsTable__head}>
                            <div
                                className={cl["callsTable__head--withArrow"]}
                                onClick={handleTimeSort}
                            >
                                Время
                                <span
                                    className={`${cl.callsTable__arrow} ${
                                        sort_by === "date" &&
                                        date_order === "ASC"
                                            ? cl.down
                                            : ""
                                    }`}
                                />
                            </div>
                        </th>
                        <th className={cl.callsTable__head}>Сотрудник</th>
                        <th className={cl.callsTable__head}>Звонок</th>
                        <th className={cl.callsTable__head}>Источник</th>
                        <th className={cl.callsTable__head}>Оценка</th>
                        <th
                            className={cl.callsTable__head}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <div
                                className={cl["callsTable__head--withArrow"]}
                                onClick={handleDurationSort}
                            >
                                Длительность
                                <span
                                    className={`${cl.callsTable__arrow} ${
                                        sort_by === "duration" &&
                                        duration_order === "ASC"
                                            ? cl.down
                                            : ""
                                    }`}
                                />
                            </div>
                        </th>
                    </tr>
                    {!isLoading ? (
                        data?.results.length ? (
                            uniqueDates.map((date, index) => {
                                const callsInSection = data?.results?.filter(
                                    (item) => dateFormatter(item.date) === date
                                );

                                return (
                                    <React.Fragment key={index}>
                                        {date.toLocaleLowerCase() ===
                                        "сегодня" ? null : (
                                            <tr
                                                className={
                                                    cl.callsTable__timeSection
                                                }
                                            >
                                                <td colSpan={7}>
                                                    {date}
                                                    <sup
                                                        className={
                                                            cl.callsTable__count
                                                        }
                                                    >
                                                        {callsInSection?.length}
                                                    </sup>
                                                </td>
                                            </tr>
                                        )}
                                        <AudioProvider>
                                            {callsInSection?.map((item) => (
                                                <CallItem
                                                    key={item.id}
                                                    call={item}
                                                />
                                            ))}
                                        </AudioProvider>
                                    </React.Fragment>
                                );
                            })
                        ) : (
                            <>
                                <tr>
                                    <td colSpan={7}>
                                        {isError ? (
                                            <ErrorPlug text="Что-то пошло не так, попробуйте позже" />
                                        ) : null}
                                        {!data?.results.length && !isError ? (
                                            <EmptyPlug text="Ничего не найдено" />
                                        ) : null}
                                    </td>
                                </tr>
                            </>
                        )
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <Loader />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default CallsList;
