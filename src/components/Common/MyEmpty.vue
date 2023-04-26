<template>
  <div></div>
</template>

<script>
export default {
  name: "MyEmpty",
  created() {
    const id = this.$route.query.id;
    if(id==='1'){
      this.$router.push({path: '/MyHome/MenuUser'})
    }else if(id ==='2'){
      this.$router.push('/MyHome/MenuSinger')
    }

  }
}
</script>

<style scoped>

</style>
