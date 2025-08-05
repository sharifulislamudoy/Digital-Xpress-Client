import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AuthForm from "../Pages/AuthForm";
import AboutSection from "../Pages/AboutSection";
import ContactPage from "../Pages/ContactPage";
import ProductPage from "../Pages/ProductPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import ProductCategoryPage from "../Pages/ProductCategoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'authentication',
        Component: AuthForm,
      },
      {
        path: 'products',
        Component: ProductPage
      },
      {
        path: 'product/:id',
        Component: ProductDetailsPage,
      },
      {
        path: 'products/:categorySlug',
        Component: ProductCategoryPage
      },
      {
        path: 'about',
        Component: AboutSection
      },
      {
        path: 'contact',
        Component: ContactPage
      }
    ]
  },
]);