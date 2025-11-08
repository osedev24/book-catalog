import React from "react";
import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import CatalogPage from "./components/pages/CatalogPage";
import Cart from "./components/Cart";

export default function App() {
   const router = createBrowserRouter([
      {path: '/', element: <LandingPage />},
      {path: '/cart', element: <Cart/>},
      {path: '/catalog', element: <CatalogPage/>},
  ])
  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>
  );
}
