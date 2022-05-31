<template>
  <div>
    <div style="height=60px"></div>
    <el-card class="cart">
      <div style="background-color: #fff">
        <div class="blank"></div>
        <el-empty
          v-if="cartList.length === 0"
          description="购物车为空"
        ></el-empty>
        <el-table
          v-else
          :data="
            cartList.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          ref="elTable"
          style="width=100%;margin-top=20px"
          cell-style="text-align: center"
          header-cell-style="text-align: center"
          @selection-change="handleSelectionChange()"
        >
          <el-table-column label="全选" width="50"> </el-table-column>
          <el-table-column
            type="selection"
            :row-key="
              (row) => {
                return row.id;
              }
            "
            :reserve-selection="true"
            width="25"
          >
          </el-table-column>
          <el-table-column label="商品图片" prop="productImageBig" width="100">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.productImageBig"
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="productName">
          </el-table-column>
          <el-table-column label="商品价格" prop="salePrice" width="80">
          </el-table-column>
          <el-table-column label="商品数量" prop="productNum" width="80">
          </el-table-column>
          <el-table-column align="right" label="调节数目" prop="productNum">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.productNum"
                @change="handleChangeNum(scope.$index, scope.row)"
                :min="1"
                size="mini"
                label="描述文字"
                style="width: 90px"
              ></el-input-number>
              <el-popconfirm
                title="确定删除该商品？"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <el-button
                  size="mini"
                  type="danger"
                  slot="reference"
                  style="width: 40px; margin-left: 10px"
                >
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <div class="totalNum" v-if="cartList.length">
          已选择商品数：{{ totalNum }}
        </div>
        <div class="totalPrice" v-if="cartList.length">
          应付：￥{{ Number(totalPrice).toFixed(2) }}
          <el-button
            type="primary"
            round
            v-if="cartList.length"
            size="	medium"
            @click="ddd()"
            style="position: relative; top: -4px; left: 20px"
          >
            去结算
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { removeStore, getStore, setStore } from "@/utils/storage";
import BuyNum from "@/components/BuyNum";
import { removeItem } from "@/common/MHeader";
import {debounce} from "@/utils/debounce"
export default {
  data() {
    return {
      search: "",
      selectedGoods: [],
      timeout:false
    };
  },
  components: {
    BuyNum,
  },

  //加载
  async mounted() {
    if (this.login) {
      const res = await this.$http.post("/api/cartList", {
        userId: getStore("id"),
      });
      if (res.data.success === true) {
        setStore("buyCart", res.data.cartList.cartList);
        console.log(res.data.cartList.cartList);
        this.INITBUYCART();
      }
    } else {
      this.INITBUYCART();
    }
  },
  computed: {
    ...mapState(["login", "userInfo", "cartList", "showCart"]),
    totalNum() {
      return this.selectedGoods.reduce((total, item) => {
        total += item.productNum;
        return total;
      }, 0);
    },

    totalPrice() {
      return this.selectedGoods.reduce((total, item) => {
        total += item.productNum * item.salePrice;
        return total;
      }, 0);
    },
  },
  methods: {
    ...mapMutations([
      "SHOWCART",
      "INITBUYCART",
      "DELETEGOOD",
      "CHANGEPRODUCTNUM",
      "CHANGESELECT",
    ]),
    
    //增加防抖功能，防止连续点击产生的多次访问
    handleChangeNum(index, row) {
      debounce(()=>{
        let num=row.productNum;
        this.$http.post("/api/change", {
        index: index,
        userId: getStore("id"), 
        num: num,
      });
      console.log(222);
      },3000)
      
      // this.$http.post("/api/change", {
      //   index: index,
      //   userId: getStore("id"),
      //   num: num,
      // });
    },

    //跳转到支付页面
    ddd() {
      this.$router.push("/payment");
    },

    //删除商品功能
    handleDelete(index, row) {
      this.DELETEGOOD(index);
      this.$http.post("/api/deleteCart", {
        index: index,
        userId: getStore("id"),
      });
      setStore("buyCart", this.cartList);
      this.INITBUYCART();
    },

    //勾选功能
    handleSelectionChange() {
      console.log(this.$refs.elTable.selection);
      console.log(1);
      this.selectedGoods = this.$refs.elTable.selection;
    },
  },
};
</script>
<style  lang="scss" scoped>
.cart {
  width: 850px;
  margin: auto;
  border-radius: 60px;
  overflow: hidden;
  .blank {
    height: 60px;
  }
  .totalNum {
    margin-top: 20px;
    font-size: 25px;
    display: inline-block;
    margin-left: 100px;
  }
  .totalPrice {
    display: inline-block;
    float: right;
    margin-right: 80px;
    margin-top: 20px;
    font-size: 25px;
    text-align: right;
  }
}
</style>