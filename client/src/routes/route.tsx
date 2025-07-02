import { createBrowserRouter } from "react-router";
import Home from "../components/Home/Home";
import allBooks from "../pages/allBooks";
import addBooks from "../pages/addBooks";
import borrowSummary from "../pages/borrowSummary";
import borrowBook from "../components/Home/BorrowBook/borrowBook";

export const routers = createBrowserRouter([
  {path:"/",element:<Home></Home>,errorElement:<div>Error</div>,
    children:[
      {path:"allBooks",Component:allBooks},
      {path:"addBook",Component:addBooks},
      {path:"borrowSummary",Component:borrowSummary},
      {path:"borrow/:bookId",Component:borrowBook},
    ]
  }
])
