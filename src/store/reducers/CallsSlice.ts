import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { format, addDays } from "date-fns";
import { GetlistProps } from "../../services/CallsService";

interface CallsState extends GetlistProps {
    date_type: number | null;
    date_order: string;
    duration_order: string;
}

const initialState: CallsState = {
    date_type: 3,
    date_start: format(addDays(new Date(), -3), "yyyy-MM-dd"),
    date_end: format(new Date(), "yyyy-MM-dd"),
    in_out: null,
    limit: 50,
    sort_by: "date",
    date_order: "DESC",
    duration_order: "DESC",
};

export const callsSlice = createSlice({
    name: "callsParams",
    initialState,
    reducers: {
        setDate: (state, action: PayloadAction<string[]>) => {
            state.date_start = action.payload[0];
            state.date_end = action.payload[1];
        },
        setDateType: (state, action: PayloadAction<number | null>) => {
            state.date_type = action.payload;
            if (action.payload) {
                state.date_start = format(
                    addDays(new Date(), -action.payload),
                    "yyyy-MM-dd"
                );
                state.date_end = format(new Date(), "yyyy-MM-dd");
            }
        },
        setType: (state, action: PayloadAction<number | null>) => {
            state.in_out = action.payload;
        },
        setSort: (
            state,
            action: PayloadAction<{
                sort_by: string;
                order: string;
            }>
        ) => {
            state.sort_by = action.payload.sort_by;
            if (action.payload.sort_by === "date") {
                state.duration_order = "DESC";
                state.date_order = action.payload.order;
            } else {
                state.date_order = "DESC";
                state.duration_order = action.payload.order;
            }
        },
    },
});

export default callsSlice.reducer;
export { initialState };
