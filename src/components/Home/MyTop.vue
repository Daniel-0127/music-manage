<template>
  <div id="top">
    <div class="left">
      <setting-config theme="outline" size="28" fill="#333"/>
      <div >Music管理系统</div>
    </div>
    <div class="right">
      <img :src="global.AdminPath+store.state.admin.id+'.jpg'+'?'+new Date()" alt="11" style="cursor: pointer;">
      <div id="text">
        {{store.state.admin.username}}
      </div>

    </div>
  </div>
</template>

<script>
import {SettingConfig} from "@icon-park/vue-next";
import global from "@/global/index"
import store from "@/store";
export default {
  name: "MyTop",
  components: {SettingConfig},
  computed:{
    global() {
      return global
    },
    store() {
      return store
    },
  }
}
</script>

<style scoped>
#top {
  width: 100%;
  top: 0px;
  /*height: 60px;*/
  position: fixed;
  z-index: 99999;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.left {
  float: left;
  width: 200px;
  height: 40px;
  margin-top: 16px;
  margin-left: 30px;
}

.left div {
  float: right;
  font-size: 23px;
  font-weight: bold;
}

.right{
  width: 150px;
  height: 40px;
  /*background-color: #333;*/
  float: right;
}

.right img{
  margin-top: 3px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.right #text{
  width: 76px;
  float: right;
  margin: 19px 0;
  /*margin: 20px 35px 0  0;*/
}
</style>
