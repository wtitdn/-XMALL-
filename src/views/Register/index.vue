<template>
  <div class="login">
    <div class="box">
      <span>开始注册</span>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
       <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="user">
          <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码" @input="inputTit"></el-input>
          <span>{{ passStrong }}</span>
        </el-form-item>
         <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
         </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setStore, getStore, removeStore } from "@/utils/storage";
export default {
  name: "PasswordRegular",
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    
    return {
      ruleForm: {
        user: "",
        checkPass: '',
        pass: "",
        passStrong: '',
        email:""
      },
      rules: {
        email:[{ validator: validateEmail, trigger: "blur" }],
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
         checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
      cart: []
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({path: "/login"})
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    inputTit(val) {
        if (!val) {
          this.passStrong = ''
          return false
        }
        var enoughRegex = new RegExp("(?=.{6,}).*", "g") //弱
        var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g")  //中
        var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")  //强

        if (!enoughRegex.test(val)) {
          this.passStrong = '弱'
          return false
        } else if (!mediumRegex.test(val)) {
          this.passStrong = '中'
          return false
        } else if (!strongRegex.test(val)) {
          this.passStrong = '强'
          return false
        } else {
          this.passStrong = ''
          return false
        }
      }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  overflow: visible;
  background: #ededed;
  .box {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    position: absolute;
    top: 200px;
    left: 50%;
    padding: 50px 50px 50px 10px;
    margin-left: -225px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
    text-align: center;
    form {
      margin-top: 30px;
    }
    span {
      color: #333;
      font-weight: 400;
    }
  }
}
</style>