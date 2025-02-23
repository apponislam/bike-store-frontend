import { baseApi } from "../../api/baseApi";

export interface TUser {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<{ data: TUser[] }, void>({
            query: () => ({
                url: `/users`,
            }),
        }),
    }),
});

export const { useGetAllUsersQuery } = userApi;
