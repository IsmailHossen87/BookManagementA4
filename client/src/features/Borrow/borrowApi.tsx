import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {type IBorrow, type IBorrowSummary } from "../../Type/type";

export const borrowApi = createApi({
  reducerPath:"borrowPath",
  tagTypes: ['Borrows',"Books"],
  baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api"}),
  endpoints:(build)=>({
    // create a Borrow
    borrowBook:build.mutation<void,IBorrow>({
      query:(data)=>({
        url:"/borrow",
        method:"POST",
        body:data
      }),
       invalidatesTags: ["Books", "Borrows"]
    }),
    // get a Borrow
    getborrowsummary:build.query<IBorrowSummary[],void>({
      query:()=>"/borrow/summary",
      providesTags:["Borrows"]
    }),
  })
})
export const {useBorrowBookMutation,useGetborrowsummaryQuery} = borrowApi
