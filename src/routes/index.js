import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";
import Home from "../components/frontend/Home";
import MasterLayout from "../components/layouts/admin/MasterLayout";
import ViewProductCate from "../components/admin/category/ViewProductCate";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Account from "../components/frontend/Account";
import ViewProduct from "../components/admin/product/ViewProduct";
import AddProduct from "../components/admin/product/AddProduct";
import EditProduct from "../components/admin/product/EditProduct";
import ViewPromotion from "../components/admin/promotion/ViewPromotion";
import ViewTrademark from "../components/admin/trademark/ViewTrademark";
import EditTrademark from "../components/admin/trademark/EditTrademark";


const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/account',
        component: Account,
    },
    
];
const privateRoutes = [
    {
        path: '/view-category',
        component: ViewCategory,
    },
    {
        path: '/edit-category/:id',
        component: EditCategory,
    },
    {
        path: '/view-category/:id',
        component: ViewProductCate,
    },
    {
        path: '/view-product',
        component: ViewProduct,
    },
    {
        path:'/add-product',
        component: AddProduct,
    },
    {
        path:'/edit-product/:id',
        component: EditProduct,
    },
    {
        path:'/view-promotion',
        component: ViewPromotion,
    },
    {
        path:'/view-trademark',
        component: ViewTrademark,
    },
];
export { privateRoutes, publicRoutes };