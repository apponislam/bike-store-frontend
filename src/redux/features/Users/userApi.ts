import { baseApi } from "../../api/baseApi";

export interface TUser {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: string;
    isBloked?: boolean;
    status?: string;
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
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/users/change-password",
                method: "POST",
                body: data,
            }),
        }),
        changeUserStatus: builder.mutation({
            query: ({ userId, token }) => ({
                url: `/users/change-status/${userId}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useGetAllUsersQuery, useChangePasswordMutation, useChangeUserStatusMutation } = userApi;
