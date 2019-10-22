<template>
  <div>
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin()"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleLogin()" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import { requestLogin } from '../api/api';

  export default {
    data() {
      return {
        logining: false,
        account: {
          username: '',
          pwd: ''
        },
        rules: {
          username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          ],
          pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
      };
    },


    methods: {

      handleLogin() {
        var that =this;
        that.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            var aaaa = { username: that.account.username, password: that.account.pwd };
            requestLogin(aaaa).then(res => {
              // let { msg, data } = res;
              if (res.msg == "ok") {

                sessionStorage.setItem('token', 111);
                sessionStorage.setItem('username', JSON.stringify(res.data.name));

                that.$router.push('/Good/Goodlist');
              } else {
               that.$message({
                message: res.msg,
                type: 'error'
              });
             }
           });
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    mounted(){

    }
  }

</script>


<style>
  body{
    background-color: #373d41;
  }
</style>


<style scoped>


  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    /*box-shadow: 0 0 15px #aaa;*/
    background: -ms-linear-gradient(top, #fff, #6495ed);
    background:-moz-linear-gradient(top,#b8c4cb,#f6f6f8);
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#b8c4cb), to(#f6f6f8));
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#6495ed));
    background: -webkit-linear-gradient(top, #fff, #6495ed,#fff);
    background: -o-linear-gradient(top, #fff, #6495ed);
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  html,body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  .container{
    width: 100％;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #000000;
  }
</style>
