import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBorrow } from "../../Type/type";

const borrowApi = createApi({
  reducerPath:"borrowPath",
  tagTypes: ['borrow'],
  baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api"}),
  endpoints:(build)=>({
    // create a Borrow
    borrowBook:build.mutation<void,IBorrow>({
      query:(data)=>({
        url:"/borrow",
        method:"POST",
        body:data
      }),
      invalidatesTags:["borrow"]
    }),
    // get a Borrow
    getborrowsummary:build.mutation<IBorrow[],void>({
      query:()=>"/borrow/summary",
      invalidatesTags:["borrow"]
    }),
  })
})
export const {useBorrowBookMutation,useGetborrowsummaryMutation} = borrowApi
