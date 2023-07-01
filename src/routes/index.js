import ViewCategory from "../components/admin/category/ViewCategory";
import EditCategory from "../components/admin/category/EditCategory";
import Home from "../components/frontend/Home";
import CategoryList from "../components/frontend/CategoryList";
import ViewProductCate from "../components/admin/category/ViewProductCate";
import Account from "../components/frontend/Account";
import ViewProduct from "../components/admin/product/ViewProduct";
import AddProduct from "../components/admin/product/AddProduct";
import EditProduct from "../components/admin/product/EditProduct";
import ViewPromotion from "../components/admin/promotion/ViewPromotion";
import ViewTrademark from "../components/admin/trademark/ViewTrademark";
import ViewProductTrademark from "../components/admin/trademark/ViewProductTrademark";
import AddProductPor from "../components/admin/promotion/AddProductPor";
import ViewProductPor from "../components/admin/promotion/ViewProductPor";
import ViewAccount from "../components/admin/account/ViewAccount";
import ViewPermission from "../components/admin/permission/ViewPermission";
import ViewStaff from "../components/admin/staff/ViewStaff";
import AddAccount from "../components/admin/staff/AddAccount";
import ProductDetails from "../components/frontend/ProductDetails";
import ViewColor from "../components/admin/color/ViewColor";
import ViewMaterial from "../components/admin/material/ViewMaterial";
import About from "../components/frontend/static/About";
import Blog from "../components/frontend/static/Blog";
import Contact from "../components/frontend/static/Contact";
import Cart from "../components/frontend/Cart";
import Pay from "../components/frontend/Pay";
import ViewOrder from "../components/admin/order/ViewOrder";
import ViewOrderItems from "../components/admin/order/ViewOrderItems";
import Thanks from "../components/frontend/static/Thanks";
import PayVNPAY from "../components/frontend/PayVNPAY";
import OrderItems from "../components/frontend/OrderItems";
import Favourite from "../components/frontend/Favourite";
import ViewEvaluate from "../components/admin/evaluate/ViewEvaluate";
import Search from "../components/frontend/Search";
import ForgotPassword from "../components/frontend/auth/ForgotPassword";
import ResetPassword from "../components/frontend/auth/ResetPassword";


const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/account',
        component: Account,
    },
    {
        path: '/order/:id',
        component: OrderItems,
    },
    {
        path: '/category/:slug',
        component: CategoryList,
    },
    {
        path: '/:categoryName/:id',
        component: ProductDetails,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/blog',
        component: Blog,
    },
    {
        path: '/contact',
        component: Contact,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/favourite',
        component: Favourite,
    },
    {
        path: '/search',
        component: Search,
    },
    {
        path: '/pay',
        component: Pay,
    },
    {
        path: '/vnpay',
        component: PayVNPAY,
    },
    {
        path: '/thanks',
        component: Thanks,
    },
    {
        path: '/forgotpassword',
        component: ForgotPassword,
    },
    {
        path: '/reset/:slug',
        component: ResetPassword,
    },

];
const privateRoutes = [
    {
        path: '/view-product',
        component: ViewProduct,
        value: 1
    },
    {
        path: '/add-product',
        component: AddProduct,
        value: 1
    },
    {
        path: '/edit-product/:id',
        component: EditProduct,
        value: 1
    },
    {
        path: '/view-color',
        component: ViewColor,
        value: 1
    },
    {
        path: '/view-evaluate',
        component: ViewEvaluate,
        value: 1
    },
    {
        path: '/view-material',
        component: ViewMaterial,
        value: 1
    },
    {
        path: '/view-category',
        component: ViewCategory,
        value: 2
    },
    {
        path: '/edit-category/:id',
        component: EditCategory,
        value: 2
    },
    {
        path: '/view-category/:id',
        component: ViewProductCate,
        value: 2
    },
    {
        path: '/view-promotion',
        component: ViewPromotion,
        value: 3
    },
    {
        path: '/promotion/view-product/:id',
        component: ViewProductPor,
        value: 3
    },
    {
        path: '/promotion/add-product/:id',
        component: AddProductPor,
        value: 3
    },
    {
        path: '/view-trademark',
        component: ViewTrademark,
        value: 4
    },
    {
        path: '/view-trademark/:id',
        component: ViewProductTrademark,
        value: 4
    },
    {
        path: '/view-order',
        component: ViewOrder,
        value: 5
    },
    {
        path: '/view-order/:id',
        component: ViewOrderItems,
        value: 5
    },
    {
        path: '/view-account',
        component: ViewAccount,
        value: 6
    },
    {
        path: '/add-account',
        component: AddAccount,
        value: 7
    },
    {
        path: '/view-staff',
        component: ViewStaff,
        value: 7
    },
    {
        path: '/view-role',
        component: ViewPermission,
        value: 8
    },
    

];
export { privateRoutes, publicRoutes };