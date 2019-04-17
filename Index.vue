<template>
    <div>
      <div><h1>济南大学材料学院学生信息管理系统</h1></div>
      <div class="sign">
        <form v-model="form">
        <div class="input-frame"><label>用户名：</label><el-input class="el-input" v-model="form.username" placeholder="请输入用户名"></el-input></div>
        <div class="input-frame"><label>密码&nbsp;&nbsp;&nbsp;：</label><el-input class="el-input" v-model="form.password" placeholder="请输入密码" show-password></el-input></div>
        </form>
        <el-button type="primary" round v-on:click="submitForm">登陆</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
      data(){
          return {
            form:{
            username: '',
            password: ''
            }
          }
      },
      methods:{
          submitForm:function(){
            let _this = this;
            let data = this.qs.stringify({
              username:_this.form.username,
              password:_this.form.password
            });
            this.axios
              .post('https://college.netlab.sunan.me/vue/login/login',data)
              .then(res=> {
              window.localStorage.setItem("token",res.data.token);
              if(res.data.isSuccess === 1){
                window.location.href='/'
              }
              })
              .catch(err => {
              console.log(err);
            });
          }
      }
    }
</script>

<style scoped>
  .sign{
    margin-top: 150px;
  }
  .input-frame{
    display: block;
    margin-top:30px;
  }
  .el-input{
    width:25%;
    text-align:right
  }
  button{
    margin-top: 30px;
    width: 12%;
  }
</style>
