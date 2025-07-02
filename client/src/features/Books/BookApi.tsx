import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../Type/type";

export const bookApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books","Book"],
  endpoints: (builder) => ({
    // collect all books
    getBooks: builder.query<IBook[], void>({
      query: () => "/books",
      providesTags: ["Books"]
    }),
    // get single book
    getBook: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
        providesTags: (result, error, id) => [{ type: "Book", id }]
    }),
    // create single book
    createBook: builder.mutation<void, Partial<IBook>>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook
      }),
      invalidatesTags: ["Books"]
    }),
    // Update single book
    updateBook: builder.mutation<void, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Books"]
    }),
    // create single book
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"]
    }),
  })
})

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
} = bookApi
