<template>
  <div class="loginPage">
    <div class="main">
        <div class="login-form">
            <div class="header" >Admin  Login</div>
                <div class="form">
                      <form @submit.prevent="login">
                            <div class="form-group">
                              <label for="username" class="title">Username</label>
                              <input type="text" id="username" v-model="username" required>
                            </div>
                            <div class="form-group">
                              <label for="password" class="title">Password</label>
                              <input type="password" id="password" v-model="password" required>
                            </div>
                            <button type="submit" class="btnLogin">Login</button>
                      </form> 
                </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const adminUsername = 'admin';
      const adminPassword = 'password';

      if (this.username === adminUsername && this.password === adminPassword) {
        // Successful login
        alert('Login successful! Redirecting to the admin dashboard...');
        // Perform your desired action here, e.g., redirect to the dashboard
      } else {
        // Invalid credentials
        alert('Invalid username or password. Please try again.');
        // Clear the form fields
        this.username = '';
        this.password = '';
      }
    },
  },
};
</script>

<style scoped>
div{
  display: block;
}
.loginPage{
      height: 200%;
}
.main{
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-bottom: 200px;
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 ;
    background-size: 100%;
    position: relative;;
}
.login-form {
 padding: 3px 0 24px;
}
.form-group {
  padding: 2px 0 24px;
}
.header{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.form{
  min-width: 260px;
    width: 368px;
    margin: 0 auto;
}
.title{
  display: block;
  font-weight: bold;
  float: left;
}
label {
  display: block;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 10px ;
  font-size: 16px;
  border: 1px solid #ccc;
}
.btnLogin{
   padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
    color: #fff;
    background-color: #1890ff;
    border: none;
  
}
</style>
