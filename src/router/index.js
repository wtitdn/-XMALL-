import Vue from 'vue'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

// 异步组件加载
const Index = () => import('@/views/Index');
const Login = () => import('@/views/Login');
const Home = () => import('@/views/Home');
const Goods = () => import('@/views/Goods');
const Thanks = () => import('@/views/Thanks');
const GoodsDetail = () => import('@/views/GoodsDetail');
const User = () => import('@/views/User');
const Register = () => import('@/views/Register');
const Cart = () => import('@/views/Cart');
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/home',
    name: 'home',
    component: Index,
    children: [
      {
        path: "home",
        component: Home
      },
      {
        path: "goods",
        component: Goods
      },
      {
        path: "thanks",
        component: Thanks
      },
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: GoodsDetail
      }
    ]
    },
    {
      path: '/login',
      name: "login",
      component: Login,

    },        
    {
      path:'/register',
      name:'register',
      component: Register
    },
    {
      path:'/Cart',
      name:'Cart',
      component: Cart
    },
    {
      path:'/user',
      name:'user',
      component:User,
      meta:{
        // 需要守卫
        auth:true
      }
    }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
