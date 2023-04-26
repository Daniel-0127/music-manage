<template>
<div style="width: 100%;">
    <MyTop></MyTop>
  <div style="width: 100%;margin: 57px auto">
    <div style="float: left;width: 15%">
      <MyMenu></MyMenu>
    </div>
    <div style="float: right;width: 85%;">
      <router-view style="width: 94%;
  margin: 20px auto;"></router-view>
    </div>

  </div>
</div>
</template>

<script>
import MyTop from "@/components/Home/MyTop.vue";
import MyMenu from "@/components/Menu/MyMenu.vue";

export default {
  name: "MyHome",
  components: {MyMenu, MyTop}
}
</script>

<style scoped>

</style>
