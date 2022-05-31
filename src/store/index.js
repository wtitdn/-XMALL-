import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { setStore,getStore} from '@/utils/storage'
export default new Vuex.Store({
  
  state: {
    login: false,//是否登录
    userInfo: null,//用户信息
    cartList: [],//加入购物车商品
    showCart: false,
    multipleSelection:[]//已选择的购物车
  },
  mutations: {

    //购物车选择功能实现
    CHANGESELECT(state,val){
      state.multipleSelection=val;
    },
  
    //已废弃
    CHANGEPRODUCTNUM(state,index,num)
    {
      console.log(state.cartList[index].productNum,num);
    },

    //删除商品
    DELETEGOOD(state,index){
      state.cartList.splice(index,1)
      console.log(state.cartList);
      console.log(state.cartList.length);
      // if(state.cartList.length===0){
      //   state.showCart=!state.showCart
      // }
      console.log(state.showCart);
    },

    //从localstoreage中获取购物车清单
    INITBUYCART(state) {
      let initCart = getStore('buyCart');
      if (initCart) {
        state.cartList = JSON.parse(initCart)
      }
    },

    //展示购物车
    SHOWCART(state, { showCart }) {
      state.showCart = showCart;
    },

    //从store中获取登录的id，并且存到localstoreage实现登录持久化
    ISLOGIN(state, info) {
      state.userInfo = info;
      state.login = true;
      setStore('userInfo', info);
    },
    
    //新增商品到购物车
    ADDCART(state, { productId, salePrice, productName, productImageBig, productNum}) {
      let cart = state.cartList;
      let goods = {
        productId,
        salePrice,
        productName,
        productImageBig
      }
      let flag = true;
      if (cart.length) {
        cart.forEach(item => {
          if (item.productId === productId) {
            if (item.productNum >= 0) {
              flag = false;
              item.productNum += productNum;
            }
          }
        })
      }
      if (!cart.length || flag) {
        goods.productNum = productNum;
        cart.push(goods);
      }
      state.cartList = cart;
      setStore('buyCart', cart);
      // state.showCart=true;
      console.log(state.showCart);
    }

  },
  actions: {
  },
  modules: {
  }
})
