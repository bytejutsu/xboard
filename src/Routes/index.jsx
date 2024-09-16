import React from "react"
import { createHashRouter, RouterProvider } from "react-router-dom"
//ROUTER ROOT
import rootRouter from "../Screens/rootRouter"
const router = createHashRouter(rootRouter)
const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default Router
