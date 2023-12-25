import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICalls } from "../models/ICalls";

export interface GetlistProps {
    date_start: string;
    date_end: string;
    in_out: number | null;
    limit?: number;
    status?: string;
    sort_by?: string;
    order?: string;
}

export interface getCallRecirdProps {
    record: string;
    partnership_id: number;
}

export const callsApi = createApi({
    reducerPath: "callsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.skilla.ru/mango",
    }),
    tagTypes: ["Calls"],
    endpoints: (build) => ({
        fetchAllPosts: build.mutation<ICalls, GetlistProps>({
            query: ({
                date_start,
                date_end,
                in_out,
                limit,
                status,
                sort_by,
                order,
            }) => ({
                url: "/getList",
                method: "POST",
                params: {
                    date_start: date_start,
                    date_end: date_end,
                    in_out: in_out,
                    limit: limit,
                    sort_by: sort_by,
                    order: order,
                },
                headers: {
                    Authorization: `Bearer testtoken`,
                },
            }),
            invalidatesTags: () => ["Calls"],
        }),
        getCallRecord: build.mutation<Blob, getCallRecirdProps>({
            query: ({ record, partnership_id }) => ({
                url: "/getRecord",
                method: "POST",
                params: {
                    record: record,
                    partnership_id: partnership_id,
                },
                headers: {
                    "Content-Type": "audio/mpeg",
                    "Content-Transfer-Encoding": "binary",
                    "Content-Disposition": 'filename="record.mp3"',
                    Authorization: `Bearer testtoken`,
                },
                responseType: "blob",
            }),
            invalidatesTags: () => ["Calls"],
        }),
    }),
});
