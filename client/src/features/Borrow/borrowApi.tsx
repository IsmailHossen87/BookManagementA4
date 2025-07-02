import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {type IBorrow, type IBorrowSummary } from "../../Type/type";

export const borrowApi = createApi({
  reducerPath:"borrowPath",
  tagTypes: ['Borrow',"Book"],
  baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api"}),
  endpoints:(build)=>({
    // create a Borrow
    borrowBook:build.mutation<void,IBorrow>({
      query:(data)=>({
        url:"/borrow",
        method:"POST",
        body:data
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Book', id: arg.book }, 'Borrow'
      ]
    }),
    // get a Borrow
    getborrowsummary:build.query<IBorrowSummary[],void>({
      query:()=>"/borrow/summary",
      providesTags:["Borrow"]
    }),
  })
})
export const {useBorrowBookMutation,useGetborrowsummaryQuery} = borrowApi
