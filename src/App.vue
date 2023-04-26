<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import MyLogin from "@/components/Login/MyLogin.vue";
import MyHome from "@/components/Home/MyHome.vue";

export default {
  name: 'App',
  components: [MyLogin,MyHome]
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
