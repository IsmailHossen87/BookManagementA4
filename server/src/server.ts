const port = 5000
import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";


let server:Server;
async function main() {
  await mongoose.connect("mongodb+srv://BookManagement:gA9W4TEA0jZjTOm8@cluster0.hg2ad.mongodb.net/BookManagement?retryWrites=true&w=majority&appName=Cluster0");
  server = app.listen(port,()=>{
    console.log(`Port is running ${port}`)
  })
}
main()
