import { createBrowserRouter } from "react-router";
import allBooks from "../pages/allBooks";
import addBooks from "../pages/addBooks";
import borrowSummary from "../pages/borrowSummary";
import borrowBook from "../components/Home/BorrowBook/borrowBook";
import EditBookForm from "../components/CardEdit/editCard";
import mainLayout from "../components/Home/mainLayout";
import Home from "../components/Home/Home";

export const routers = createBrowserRouter([
  {path:"/",Component:mainLayout,errorElement:<div>Error</div>,
    children:[
      {path:"/",element:<Home/>},
      {path:"allBooks",Component:allBooks},
      {path:"addBook",Component:addBooks},
      {path:"borrowSummary",Component:borrowSummary},
      {path:"borrow/:bookId",Component:borrowBook},
      {path:"books/:bookId",Component:EditBookForm},
    ]
  }
])
