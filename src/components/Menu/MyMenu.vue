<template>
  <div >
    <el-row class="tac">
      <el-col style="width: 100%;">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="this.$route.path"
            text-color="#fff"
            style="height: 92vh;"
            router
        >
          <el-menu-item index="/MyHome/MenuMain">
            <el-icon>
              <home-two theme="outline" size="24" fill="#ffffff"/>
            </el-icon>
            <span>系统首页</span>
          </el-menu-item>
          <el-menu-item index="/MyHome/MenuUser">
            <el-icon>
              <data-user theme="outline" size="24" fill="#ffffff"/>
            </el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/MyHome/MenuSinger">
            <el-icon>
              <entertainment theme="outline" size="24" fill="#ffffff"/>
            </el-icon>
            <span>歌手管理</span>
          </el-menu-item>
          <el-menu-item index="/MyHome/MenuSong">
            <el-icon>
              <view-list theme="outline" size="24" fill="#ffffff"/>
            </el-icon>
            <span>歌曲管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {DataUser, Entertainment, HomeTwo, ViewList} from "@icon-park/vue-next";

export default {
  name: "MyMenu",
  components: {
    HomeTwo, DataUser, Entertainment,ViewList
  },
}
</script>

<style scoped>

</style>
