<template>
  <div class="main">
    <div class="container">
      <div class="form">
        <div class="header">
          <img
            src="@/assets/images/auth/profile_bg.png"
            alt
            style="width: 380px"
          />
          <div class="userImg">
            <img
              src="@/assets/images/auth/user.png"
              alt
              style="width: 60px; height: 60px; border-radius: 50%"
            />
          </div>
        </div>
        <div class="formPage">
          <div class="topInput">
            <el-input
              :placeholder="$t('message.system.userName')"
              size="large"
              v-model="form.name"
            >
              <template #prefix>
                <el-icon class="icon">
                  <User />
                </el-icon>
              </template>
            </el-input>
          </div>
          <div class="bottomInput">
            <el-input
              show-password
              :placeholder="$t('message.system.password')"
              size="large"
              v-model="form.password"
            >
              <template #prefix>
                <el-icon class="icon">
                  <Unlock />
                </el-icon>
              </template>
            </el-input>
          </div>
          <div style="margin-top: 20px; margin-bottom: -30px">
            <el-checkbox size="large" />
            <span style="font-size: 16px; margin-left: 5px">{{
              $t("message.system.rememberMe")
            }}</span>
          </div>
          <div class="loginBtn" @click="submit()">
            {{ $t("message.system.login") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";
// import { Unlock, User } from "@element-plus/icons-vue";
import { defineComponent, ref, reactive } from "vue";
// import { useStore } from "vuex";
// import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const form = reactive({
      name: "super_admin",
      password: "123456",
      loading: false,
    });

    const checkForm = () => {
      return new Promise((resolve, reject) => {
        if (form.name === "") {
          ElMessage.warning({
            message: "用户名不能为空",
            type: "warning",
          });
          return;
        }
        if (form.password === "") {
          ElMessage.warning({
            message: "密码不能为空",
            type: "warning",
          });
          return;
        }
        resolve(true);
      });
    };

    const submit = () => {
      checkForm().then(() => {
        form.loading = true;
        let params = {
          name: form.name,
          password: form.password,
        };
        store
          .dispatch("user/login", params)
          .then(async () => {
            ElMessage.success({
              message: "登录成功",
              type: "success",
              showClose: false, // 是否显示关闭按钮
              duration: 1000, // 1 秒
            });
            location.reload();
          })
          .finally(() => {
            form.loading = false;
          });
      });
    };

    return {
      form,
      submit,
    };
  },
});

// export default {
//   data() {
//     return {
//       loginForm: {
//         name: "super_admin", // super_admin
//         password: "123456", // 123456
//       },
//       Unlock,
//       User,
//     };
//   },
//   methods: {
//     submit() {
//       const store = useStore();
//       login(this.loginForm)
//         .then((data, val) => {
//           store.commit("setToken", data.token);
//           console.log("LOGIN SUCCESSFUL!", val);
//           ElMessage({
//             message: "Congrats, this is a success message.",
//             type: "success",
//             duration: 2000, // 2秒
//           });
//         })
//         .catch((err) => {
//           const resp = err.response.data;
//           const msg = resp.message;
//           ElNotification({
//             title: "Error",
//             message: msg,
//             type: "error",
//             duration: 1500, // 1.5秒
//             showClose: false, // 是否显示关闭按钮
//           });
//         });
//     },
//   },
// };
</script>
<style>
div {
  display: block;
}
.main {
  width: 100vw;
  height: 100vh;
  background-image: url(@/assets/images/auth/login_bg.jpg);
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 130px;
  padding: 300px;
  width: 100%;
  height: 100%;
  background-size: 100%;
  position: absolute;
}
.form {
  padding: 32px 0 24px;
  background: #f0f2f5;
}
.header {
  text-align: center;
  position: relative;
  margin-bottom: 40px;
  margin-top: -32px;
}
.formPage {
  min-width: 260px;
  width: 368px;
  margin: 20px auto;
  padding: 20px;
  margin-left: 10px;
}
.bottomInput {
  width: 100%;
  height: 1rem;
  margin-top: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.topInput {
  width: 100%;
  height: 1rem;
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginBtn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  margin-top: 3rem;
  line-height: 1.2rem;
  background: rgb(24, 144, 255);
  border-radius: 1.5rem;
  color: #fff;
  text-align: center;
  padding: 10px;
}

.userImg {
  display: flex;
  justify-content: center;
  margin-top: -20px;
}
.el-input__inner {
  padding: 18px 5px;
}
</style>
