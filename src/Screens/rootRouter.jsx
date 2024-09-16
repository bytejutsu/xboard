import React from "react";

import Auth from "./Auth/pages";
import Main from "./Main";
import MainLayout from "@layouts/MainLayout";
import ErrorPage from "./404";
export default [
  {
    path: "/",
    element: (
      <MainLayout>
        <Main />
      </MainLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <ErrorPage />,
  },
];
