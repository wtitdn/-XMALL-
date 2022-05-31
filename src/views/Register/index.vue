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
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="user">
          <el-input
            type="text"
            v-model="ruleForm.user"
            autocomplete="off"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入密码"
            @input="inputTit"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="ruleForm.pass !== '' && ruleForm.pass !== undefined"
          label=""
          align="center"
          label-width="0"
        >
          <div class="bar" :class="barColor" :style="{ width: width + 'px' }">
            <div
              class="strength"
              :style="{ color: barColor }"
              v-if="ruleForm.pass !== '' && ruleForm.pass !== undefined"
            >
              {{ passStrong }}
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordRegular",
  data() {
    //   let aaaa=(rule, value, callback)=> {
    //  if (ruleForm.passStrong === '低') {
    //           this.width = 60
    //           this.barColor = 'red'
    //           this.strength = this.indicator['red']
    //         }
    //   if (ruleForm.passStrong === '中') {
    //           this.width = 120
    //           this.barColor = 'orange'
    //           this.strength = this.indicator['orange']
    //         }
    //   };
    //   if (ruleForm.passStrong === '中') {
    //           this.width = 120
    //           this.barColor = 'orange'
    //           this.strength = this.indicator['orange']
    //         };
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
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      barColor: "red",
      strength: "",
      indicator: {
        red: "弱",
        orange: "中",
        blue: "强",
      },
      width: 0, //到这上面都是密码强度
      notCheck: true,
      ruleForm: {
        user: "",
        checkPass: "",
        pass: "",
        passStrong: "",
        email: "",
      }, //注册信息 除了passStrong都要传到后端
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      cart: [],
    };
  },
  mounted() {},
  methods: {
    //提交注册表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$mb.alert("即将返回登录页面", "注册成功", {
            confirmButtonText: "确定",
          });
          this.submit(this.ruleForm);
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 1500); //模拟异步操作 返回登录界面
        } else {
          this.$mb.alert("请核对注册信息", "注册失败", {
            confirmButtonText: "确定",
          });
          return false;
        }
      });
    },
    submit(form){
      console.log(form);
      //传送到后端进行校验
    },
    inputTit(val) {
      if (!val) {
        this.passStrong = "";
        return false;
      }
      var enoughRegex = new RegExp("(?=.{6,}).*", "g"); //弱
      var mediumRegex = new RegExp(
        "^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
        "g"
      ); //中
      var strongRegex = new RegExp(
        "^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
        "g"
      ); //强

      if (!enoughRegex.test(val)) {
        this.width = 60;
        this.barColor = "red";
        this.strength = this.indicator["red"];
        this.passStrong = "弱";
        return false;
      } else if (!mediumRegex.test(val)) {
        this.width = 120;
        this.barColor = "orange";
        this.strength = this.indicator["orange"];
        this.passStrong = "中";
        return false;
      } else if (!strongRegex.test(val)) {
        this.width = 180;
        this.barColor = "blue";
        this.strength = this.indicator["blue"];
        this.passStrong = "强";
        return false;
      } else {
        this.passStrong = "";
        return false;
      }
    },
  },
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
    .strength {
      font-size: 13px;
      color: #271E25;
      position: relative;
      top: 5px;
      left: 0;
      transition: 0.5s all ease;
    }
    .bar {
      width: 60px;
      height: 5px;
      background: red;
      transition: 0.5s all ease;
      max-width: 180px;
      margin: 10px 0 5px 5px;
      display: inline-block;
    }
    .red {
      background: red;
    }
    .orange {
      background: orange;
    }
    .blue {
      background: #1B8EF8;
    }
    form {
      margin-top: 30px;
    }
    span {
      color: #333;
      font-weight: 400;
    }
    #pswcol {
      color: aqua;
    }
  }
}
</style>