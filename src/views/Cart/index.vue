<template>
  <el-table
    :data="
      tableData.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
  >
    <el-table-column label="商品图片" prop="productImageBig">
      
    </el-table-column>
    <el-table-column label="商品名称" prop="productName"> </el-table-column>
    <el-table-column label="商品价格" prop="salePrice"> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <buy-num></buy-num>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete
          </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { removeStore, getStore, setStore } from "@/utils/storage";
import BuyNum from "@/components/BuyNum";
import AA from '../../../db/cartList.json';
console.log( AA.result[0].cartList);
export default {
  data() {
    return {
      tableData: [

      ],
      search: "",
    };
  },
  components: {
    BuyNum
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>