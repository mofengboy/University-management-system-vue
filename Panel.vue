<template>
  <el-container>
    <el-header>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        高校数据管理系统管理端
        <el-button v-show="isShow" round style="float: right;display: inline" class="el-icon-edit" v-on:click="conAuth">权限管理</el-button>
        <el-button v-if="isAuth" round style="float: right;display: inline" class="el-icon-back" v-on:click="returnSubmit">返回</el-button>
      </h1>
    </el-header>
    <el-main>

      <div class="main">
        <!--时间范围选择-->
        <div v-show="isShow">
          <p></p>
        <div class="block" v-show="isShow">
          <span class="demonstration">选择您要查询的时间范围：</span>
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '00:00:00']">
          </el-date-picker>
        </div>
        <el-button type="primary" v-on:click="timeSubmit">查询</el-button>
        </div>
        <!--显示宿舍分数信息-->
        <div v-if="isCheck">
          <el-table
            :data="infoTable"
            border
            style="width: 100%">
            <el-table-column
              prop="check_date"
              label="日期"
              width="120">
            </el-table-column>
            <el-table-column
              prop="check_time"
              label="时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="building"
              label="楼号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="room"
              label="宿舍号">
            </el-table-column>
            <el-table-column
              prop="scores"
              label="分数">
            </el-table-column>
            <el-table-column
              label="照片"
              width="500">
              <template slot-scope="scope">
                <img :src="scope.row.photo" width="600px">
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" v-on:click="returnSubmit">返回继续查询</el-button>
        </div>
        <!--权限信息-->
        <div v-if="isAuth">
          <p style="float: left">权限申请名单：</p>
          <el-table
            :data="infoTable"
            border
            style="width: 100%">
            <el-table-column
              prop="real_name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="nick_name"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="phone_number"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="authority"
              label="权限">
            </el-table-column>
            <el-table-column
              prop="change_authority"
              label="申请更改的权限">
            </el-table-column>
            <el-table-column
              prop="register_date"
              label="注册时间">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" style=" margin:0 5px 0 5px; width: 50px"
                  size="mini"
                  @click="">确认</el-button>
                <el-button
                  size="mini" style="margin:0 5px 0 5px; width: 50px"
                  type="danger"
                  @click="">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
          <p style="float: left">所有人员的的权限信息：</p>
          <el-table
            :data="infoTable"
            border
            style="width: 100%">
            <el-table-column
              prop="real_name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="nick_name"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="phone_number"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="authority"
              label="权限">
            </el-table-column>
            <el-table-column
              prop="register_date"
              label="注册时间">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
    <el-footer>
      版权所有 项目组
    </el-footer>
  </el-container>
</template>

<script>
    export default {
        name: "Panel",
      data(){
          return{
            timeRange:'',
            isShow:true,
            isCheck:false,
            isAuth:false,
            infoTable:[]
        }
      },
      created() {
          // 验证token
          let token = window.localStorage.getItem('token');
          let data = this.qs.stringify({
            token:token
          });
          if(token != null){
            this.axios
              .post('https://college.netlab.sunan.me/vue/login/checkToken',data)
              .then(res=>{
                if(res.data === -1){
                  window.location.href='/#/login'
                }
              })
              .catch(err=>{
              console.log(err);
            })
          }else {
            window.location.href='/#/login';
          }
      },
      methods:{
          timeSubmit:function () {
            let time0 = ((this.timeRange[0]).toString()).split(' ');
            let time1 = ((this.timeRange[1]).toString()).split(' ');
              switch (time0[1]) {
                case 'Jan':time0[1] = '1';
                  break;
                case 'Feb':time0[1] = '2';
                  break;
                case 'Mar':time0[1] = '3';
                  break;
                case 'Apr':time0[1] = '4';
                  break;
                case 'May':time0[1] = '5';
                  break;
                case 'Jun':time0[1] = '6';
                  break;
                case 'Jul':time0[1] = '7';
                  break;
                case 'Aug':time0[1] = '8';
                  break;
                case 'Sep':time0[1] = '9';
                  break;
                case 'Oct':time0[1] = '10';
                  break;
                case 'Nov':time0[1] = '11';
                  break;
                case 'Dec':time0[1] = '12';
                  break;
              }
              switch (time1[1]) {
              case 'Jan':time1[1] = '1';
                break;
              case 'Feb':time1[1] = '2';
                break;
              case 'Mar':time1[1] = '3';
                break;
              case 'Apr':time1[1] = '4';
                break;
              case 'May':time1[1] = '5';
                break;
              case 'Jun':time1[1] = '6';
                break;
              case 'Jul':time1[1] = '7';
                break;
              case 'Aug':time1[1] = '8';
                break;
              case 'Sep':time1[1] = '9';
                break;
              case 'Oct':time1[1] = '10';
                break;
              case 'Nov':time1[1] = '11';
                break;
              case 'Dec':time1[1] = '12';
                break;
            }
            let data= this.qs.stringify({
              timeMonth0: time0[1],
              timeDay0:time0[2],
              timeYear0:time0[3],
              timeMonth1: time1[1],
              timeDay1:time1[2],
              timeYear1:time1[3]
            });
          this.axios
            .post('https://college.netlab.sunan.me/vue/info/info',data)
            .then(res=>{
              console.log(res);
              if(res.data !== []){
                this.isShow = false;
                this.isCheck = true;
                this.infoTable = res.data;
              }else {
                console.log("空信息");
              }
            })
            .catch(err=>{
              console.log(err)
            })
          },
        returnSubmit:function () {
          window.location.href='/'
        },
        conAuth:function () {
            this.axios
              .post('https://college.netlab.sunan.me/vue/authority/auth')
              .then(res=>{
                this.infoTable = res.data;
              })
              .catch(err=>{
                console.log(err)
              });
            this.isShow = false;
            this.isAuth = true;
        }
      }
    }
</script>

<style scoped>
.main{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
  button{
    margin:80px 0 50px 0;
    width: 150px;
  }
</style>
