import { baseApi } from "../../api/baseApi";

export interface Product {
    _id: string;
    name: string;
    brand: string;
    price: number;
    photo?: string;
    category: "Mountain" | "Road" | "Hybrid" | "Electric";
    description: string;
    quantity: number;
    inStock: boolean;
    isDelected?: boolean;
    createdAt: string;
    updatedAt: string;
}

interface TParams {
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    category?: string;
    inStock?: boolean;
}

const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<{ data: Product[] }, Partial<TParams>>({
            query: (params) => {
                console.log("Sending API Request with Params:", params);

                const searchParams: Record<string, string> = {};
                Object.entries(params || {}).forEach(([key, value]) => {
                    if (value !== undefined && value !== "") {
                        searchParams[key] = String(value);
                    }
                });

                return {
                    url: `/products`,
                    params: searchParams,
                };
            },
        }),
        getProductBrands: builder.query<{ data: Partial<Product>[] }, void>({
            query: () => ({
                url: "/productsBrand",
            }),
        }),
        getProductById: builder.query<{ data: Product }, string>({
            query: (id) => ({
                url: `/products/${id}`,
            }),
        }),
        deleteProduct: builder.mutation<void, { _id: string; token: string }>({
            query: ({ _id, token }) => ({
                url: `/products/${_id}`,
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                },
            }),
        }),
        updateProduct: builder.mutation<Product, { id: string; updatedData: Partial<Product>; token: string }>({
            query: ({ id, updatedData, token }) => ({
                url: `/products/${id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: updatedData,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductBrandsQuery, useGetProductByIdQuery, useDeleteProductMutation, useUpdateProductMutation } = productApi;
