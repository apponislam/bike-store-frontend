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

// order 2

type User = {
    _id: string;
    name: string;
    email: string;
};

type Transaction = {
    id: string;
    transactionStatus: string | null;
    bank_status: string;
    date_time: string;
    method: string;
    sp_code: string;
    sp_message: string;
};

type Product = {
    product: string;
    quantity: number;
    _id: string;
};

type Order = {
    transaction: Transaction;
    _id: string;
    user: string | User;
    products: Product[];
    totalPrice: number;
    status: string;
    createdAt?: string;
    updatedAt?: string;
};

export type Order2 = {
    transaction: Transaction;
    _id: string;
    user: User;
    products: Product[];
    totalPrice: number;
    status: string;
    estimateTime?: string;
    createdAt?: string;
    updatedAt?: string;
};

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
        getOrders: builder.query<{ data: Order2[] }, string>({
            query: (token) => ({
                url: "/order",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        getAllOrders: builder.query<{ data: Order[] }, string>({
            query: (token) => ({
                url: `/orders`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
        cancelOrder: builder.mutation<{ data: Order }, { orderId: string; token: string }>({
            query: ({ orderId, token }) => ({
                url: `/orders/${orderId}/cancel`,
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        updateOrderAdmin: builder.mutation<{ success: boolean; data: Product }, { orderId: string; token: string; updateData: any }>({
            query: ({ orderId, token, updateData }) => ({
                url: `/orders/${orderId}/update`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: updateData,
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetOrdersQuery, useVerifyOrderQuery, useCancelOrderMutation, useUpdateOrderAdminMutation } = orderApi;
