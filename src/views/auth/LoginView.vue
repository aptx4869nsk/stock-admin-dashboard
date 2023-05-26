<template>
  <div>
    <el-form :model="loginForm" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="loginForm.name" />
      </el-form-item>
      <el-form-item label="Activity name" class="">
        <el-input v-model="loginForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">{{
          $t("login")
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { reactive } from "vue";
import { login } from "@/api/model/auth";
import { ElMessage, ElNotification } from "element-plus";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";

export default {
  data() {
    return {
      loginForm: {
        name: "super_admin",
        password: "123456",
      },
    };
  },
  methods: {
    submit() {
      login(this.loginForm)
        .then((val) => {
          console.log("LOGIN SUCCESSFUL!", val);
          ElMessage({
            message: "Congrats, this is a success message.",
            type: "success",
            duration: 2000, // 2秒
          });
        })
        .catch((err) => {
          const resp = err.response.data;
          const msg = resp.message;
          ElNotification({
            title: "Error",
            message: msg,
            type: "error",
            duration: 1500, // 1.5秒
            showClose: false, // 是否显示关闭按钮
          });
        });
    },
  },
};
</script>
