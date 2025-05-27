import { baseApi } from "../../api/baseApi";

export interface TContact {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (payload) => ({
                url: "/api/contact",
                method: "POST",
                body: payload,
            }),
        }),

        getAllContacts: builder.query<{ data: TContact[] }, void>({
            query: () => ({
                url: "/api/contact",
            }),
        }),
    }),
});

export const { useCreateContactMutation, useGetAllContactsQuery } = contactApi;
