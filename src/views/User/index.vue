<template>
  <div class="layout-container">
    <m-header> </m-header>
    <div class="nav"></div>
    <div class="w">
      <div class="left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-image style="width: 150px; height: 150px;margin-left:54px" src=https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png></el-image>
            <!-- 这个image应该是利用userid从后端动态获取头像，但是我这没有 -->
            <div style="text-align:center;font-size:20px ">{{userInfo.username}}</div>
          </div>
          <el-menu
            default-active="this.$router.path"
            router
            class="menu">
              <el-menu-item index="/user/orderList" >
                   <div>我的订单</div>
              </el-menu-item> 
              <el-menu-item index="/user">
                    <div>账户资料</div>
              </el-menu-item> 
              <el-menu-item>
                    <div>收货地址</div>
              </el-menu-item> 
              <el-menu-item >
                    <div>我的优惠</div>
              </el-menu-item> 
              <el-menu-item >
                    <div>售后服务</div>
              </el-menu-item> 
    </el-menu>
        </el-card>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MHeader from "@/common/MHeader";
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["login", "userInfo", "cartList", "showCart"]),
  },
  components: {
    MHeader,
  },
  data() {
    return {
      
    };
  },
  methods: {
   
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";

.w {
  padding-top: 40px;

  .left {
    display: inline-block;
    float: left;
    .box-card {
      margin-left: 30px;
      width: 300px;
      border-radius: 30px;
      .menu{
        text-align: center;
        border-radius: 20px;
        border-right: none;
        overflow: hidden;
        .el-menu-item{
          color: #98afee;
          background-color: #fff;
          &:hover{
            background-color:#98afee;
            color: #fff;
          }
        }
        .is-active{
             background-color:#98afee;
             color: #fff;
          }
      }
    }
  }
  .g {
    display: inline-block;
    float: right;
  }
}

.content {
  display: flex;
  height: 100%;
}

.account-sidebar {
  width: 210px;
  border-radius: 6px;
  .avatar {
    padding-top: 20px;
    border-radius: 10px;
    text-align: center;
    img {
      width: 168px;
      height: 168px;
    }
    h5 {
      font-size: 18px;
      line-height: 48px;
      font-weight: 700;
    }
  }
  .account-nav {
    padding-top: 15px;
    li {
      position: relative;
      height: 48px;
      border-top: 1px solid #ebebeb;
      line-height: 48px;
      &:hover {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
      a {
        display: block;
      }
      &.current {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
    }
  }
}

.account-content {
  margin-left: 20px;
  flex: 1;
}
</style>