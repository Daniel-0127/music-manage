<template>
  <div>
    <div id="bgg" :style="background">
      <div id="form">
        <h2>Music后台管理</h2>
        <el-form :model="ruleForm" ref="ruleForm">
          <el-form-item prop="username">
            <el-input class="el-input" v-model="ruleForm.username" placeholder="请输入账号" clearable
                      prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="newPwd" >
            <el-input  @keyup.enter="Loading" class="el-input" v-model="ruleForm.newPwd" placeholder="请输入密码" show-password
                       prefix-icon="Grid"></el-input>
          </el-form-item>
          <el-form-item>
            <div id="butt">
              <el-row class="mb-4">
                <el-button id="but" type="primary" round @click="Loading">登陆</el-button>
              </el-row>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script>
import store from "@/store";

export default {
  name: "MyLogin",
  data(){
    return{
      ruleForm: {
        username: '',
        newPwd: '',
      },
      background:{
        backgroundImage:'url('+require("@/assets/bg.jpg")+')',
        backgroundRepeat:"no-repeat",
        // backgroundSize:"100% 100%"
      }
    }
  },
  methods:{
    Loading() {
      this.axios.get("/admin/selectOne", {
        params: {
          username: this.ruleForm.username,
          password: this.ruleForm.newPwd,
        }
      }).then((res) => {
        console.log(res)
        if(res.data!=null&&res.data!==""){
          store.commit('updateAdmin',res.data)
          this.$message.success("登陆成功！")
          this.$router.push('/MyHome')
        }else{
          this.$message.error("登陆失败！")
        }
      })
    }

  }
}
</script>

<style scoped>
#bgg{
  top:-30px;
  width: 100%;
  background-size: 100%;
  padding: 205px 0;

}
#form{
  width: 300px;
  height: 280px;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 10px 40px;
  text-align: center;
}
:deep(.el-form-item){
  margin-top: 30px;
}
#butt{
  margin: 0 auto;
}

:deep(#but) {
  width: 250px;
  font-size: 23px;
}
</style>
