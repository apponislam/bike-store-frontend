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
        getAllOrders: builder.query<{ data: TOrder[] }, void>({
            query: () => ({
                url: `/orders`,
            }),
        }),
    }),
});

export const { useGetAllOrdersQuery } = orderApi;
