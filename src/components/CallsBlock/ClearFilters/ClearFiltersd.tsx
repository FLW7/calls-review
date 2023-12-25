import cl from "./clearFilters.module.scss";
import { callsSlice, initialState } from "../../../store/reducers/CallsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const ClearFilters = () => {
    const dispatch = useAppDispatch();
    const { setDateType, setType } = callsSlice.actions;
    const { date_type, in_out } = useAppSelector(
        (state) => state?.callsReducer
    );
    const clearFiltersHandler = () => {
        dispatch(setDateType(initialState.date_type));
        dispatch(setType(initialState.in_out));
    };

    return date_type !== initialState.date_type ||
        in_out !== initialState.in_out ? (
        <div className={cl.clearFilters}>
            <p className={cl.clearFilters__text}>Сбросить фильтры</p>
            <button
                className={cl.clearFilters__btn}
                onClick={clearFiltersHandler}
            />
        </div>
    ) : null;
};

export default ClearFilters;
