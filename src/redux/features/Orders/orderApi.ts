import { baseApi } from "../../api/baseApi";

export interface TProduct {
    _id: string;
    name: string;
    brand: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TOrder {
    _id: string;
    email: string;
    product: TProduct;
    quantity: number;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // createOrder: builder.mutation({
        //     query: ({ userInfo, token }) => ({
        //         url: "/order",
        //         method: "POST",
        //         body: userInfo,
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     }),
        // }),
        createOrder: builder.mutation({
            query: ({ payload, token }) => {
                return {
                    url: "/order",
                    method: "POST",
                    body: payload,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
        }),
        getOrders: builder.query({
            query: () => "/order",
        }),
        getAllOrders: builder.query<{ data: TOrder[] }, void>({
            query: () => ({
                url: `/orders`,
            }),
        }),
        verifyOrder: builder.query({
            query: ({ order_id, token }) => ({
                url: "/order/verify",
                params: { order_id },
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrdersQuery, useVerifyOrderQuery } = orderApi;
