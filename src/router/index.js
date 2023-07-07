// 专门用于创建整个应用的路由器
import VueRouter from "vue-router";

import Home from "../pages/Home.vue";
import ProductDetail from "@/pages/productDetail.vue";

//创建一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/',
            component: Home,
            children:[
                {
                    name: 'productDetail',
                    path:'productDetail',
                    component: ProductDetail
                }
            ]
        }
    ]
})