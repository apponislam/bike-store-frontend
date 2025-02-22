import { baseApi } from "../../api/baseApi";

interface Product {
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

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<{ data: Product[] }, void>({
            query: () => ({
                url: `/products`,
            }),
        }),
        getProductById: builder.query<{ data: Product }, string>({
            query: (id) => ({
                url: `/products/${id}`,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
