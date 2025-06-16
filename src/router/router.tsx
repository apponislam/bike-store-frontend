import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import SignInUser from "../Protected/SignInUser";
import AllProducts from "../components/AllProducts/AllProducts";
import ProductDetails from "../components/AllProducts/ProductDetails";
import Dashboard from "../components/Dashboard/Dashboard";
import DashboardHome from "../components/Dashboard/Home/DashboardHome";
import NonSignInUser from "../Protected/NonSignInUser";
import Profile from "../components/Dashboard/Profile/Profile";
import ManageUsers from "../components/Dashboard/ManageUsers/ManageUsers";
import ManageOrders from "../components/Dashboard/ManageOrders/ManageOrders";
import AdminRoute from "../Protected/AdminRoute";
import NotFound from "../components/NotFound/NotFound";
import AboutPage from "../components/AboutUs/AboutUs";
import Home from "../components/Home/Home";
import ManageProducts from "../components/Dashboard/ManageProducts/ManageProducts";
import PaymentVerify from "../components/AllProducts/PaymentVerify";
import ManageMyProducts from "../components/Dashboard/ManageMyProducts/ManageMyProducts";
import ContactUs from "../components/ContactUs/ContactUs";
import FAQPage from "../components/FAQ/FAQ";
import ContactMessagesTable from "../components/Dashboard/Contacts/Contacts";
import { BlogPage } from "../components/blogs/BlogPage";
import { BlogPostPage } from "../components/blogs/BlogPostPage";
import { MyBlogs } from "../components/Dashboard/MyBlogs/MyBlogs";
import AddBlogs from "../components/Dashboard/MyBlogs/AddBlogs";
import EditBlog from "../components/Dashboard/MyBlogs/EditBlogs";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: (
                    <SignInUser>
                        <Login></Login>
                    </SignInUser>
                ),
            },
            {
                path: "/register",
                element: (
                    <SignInUser>
                        <Register></Register>
                    </SignInUser>
                ),
            },
            {
                path: "/products",
                element: <AllProducts></AllProducts>,
            },
            {
                path: "/aboutus",
                element: <AboutPage></AboutPage>,
            },
            {
                path: "/contact",
                element: <ContactUs></ContactUs>,
            },
            {
                path: "/blog",
                element: <BlogPage></BlogPage>,
            },
            {
                path: "/blog/:id",
                element: <BlogPostPage></BlogPostPage>,
            },
            {
                path: "/faqs",
                element: <FAQPage></FAQPage>,
            },
            {
                path: "/product/:id",
                element: <ProductDetails />,
            },
            {
                path: "/order/verify",
                element: <PaymentVerify />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <NonSignInUser>
                <Dashboard></Dashboard>
            </NonSignInUser>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>,
            },
            {
                path: "/dashboard/myblogs",
                element: <MyBlogs></MyBlogs>,
            },
            {
                path: "/dashboard/myblogs/create",
                element: <AddBlogs></AddBlogs>,
            },
            {
                path: "/dashboard/myblogs/:id",
                element: <EditBlog></EditBlog>,
            },
            {
                path: "/dashboard/manage-users",
                element: (
                    <AdminRoute>
                        <ManageUsers></ManageUsers>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/manage-orders",
                element: (
                    <AdminRoute>
                        <ManageOrders></ManageOrders>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/manage-Products",
                element: (
                    <AdminRoute>
                        <ManageProducts></ManageProducts>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/manage-contacts",
                element: (
                    <AdminRoute>
                        <ContactMessagesTable></ContactMessagesTable>
                    </AdminRoute>
                ),
            },
            {
                path: "/dashboard/track-my-orders",
                element: <ManageMyProducts></ManageMyProducts>,
            },
            {
                path: "/dashboard/profile",
                element: <Profile></Profile>,
            },
        ],
    },
]);

export default router;
