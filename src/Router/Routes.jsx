import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AuthForm from "../Pages/AuthForm";
import ProductCategoriesPage from "../Pages/ProductCategoriesPage";
import AboutSection from "../Pages/AboutSection";
import ContactPage from "../Pages/ContactPage";

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
        Component: ProductCategoriesPage,
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