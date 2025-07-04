import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api/",
        baseUrl: "https://bike-store-backend-bice.vercel.app/api/",
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set("authorization", `${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});
