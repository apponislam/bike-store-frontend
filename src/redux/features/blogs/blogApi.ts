import { baseApi } from "../../api/baseApi";

export interface Author {
    _id: string;
    name: string;
    email: string;
    photo?: string;
    role?: string;
}

export interface Blog {
    _id?: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: Author;
    category: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface BlogQueryParams {
    searchTerm?: string;
    category?: string;
    author?: string;
}

const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query<{ data: Blog[] }, Partial<BlogQueryParams>>({
            query: (params) => {
                const searchParams: Record<string, string> = {};
                Object.entries(params || {}).forEach(([key, value]) => {
                    if (value !== undefined && value !== "") {
                        searchParams[key] = String(value);
                    }
                });

                return {
                    url: "/blogs",
                    params: searchParams,
                };
            },
        }),

        getBlogById: builder.query<{ data: Blog }, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
            }),
        }),

        createBlog: builder.mutation<{ data: Blog }, { blogData: Partial<Blog>; token: string }>({
            query: ({ blogData, token }) => ({
                url: "/blogs",
                method: "POST",
                body: blogData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        updateBlog: builder.mutation<{ data: Blog }, { id: string; updatedData: Partial<Blog>; token: string }>({
            query: ({ id, updatedData, token }) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
        }),

        deleteBlog: builder.mutation<void, { id: string; token: string }>({
            query: ({ id, token }) => ({
                url: `/blogs/${id}`,
                method: "DELETE", // soft delete
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getMyBlogs: builder.query<{ data: Blog[] }, { token: string }>({
            query: ({ token }) => ({
                url: "/blogs/me",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useGetBlogsQuery, useGetBlogByIdQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useGetMyBlogsQuery } = blogApi;
