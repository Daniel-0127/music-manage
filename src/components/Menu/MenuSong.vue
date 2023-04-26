<template>
  <div>
    <div style="width: 300px;margin-bottom: 10px">
      <el-input style="width: 200px;" v-model="input" placeholder="筛选歌曲: " @keyup.enter="searchAll"/>
      <el-button style="margin-left: 10px" type="primary" @click="searchAll">搜索</el-button>
    </div>
    <el-table :data="myData" style="width: 100%;height: 545px;overflow-y: auto;" border stripe
              :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}"
              :row-style="{height: '46px'}">
      <el-table-column prop="id" label="ID" width="180"/>
      <el-table-column prop="name" label="歌曲" width="220" show-overflow-tooltip/>
      <el-table-column prop="singer" label="歌手" width="220" show-overflow-tooltip/>
      <el-table-column prop="album" label="专辑"/>
    </el-table>
    <el-pagination style="margin-top: 18px" v-show="my_show" background layout="prev, pager, next,"
                   v-model:page-count="page_count"
                   v-model:current-page="page"
                   @update:current-page="getAllSong"/>
  </div>
</template>

<script>
export default {
  name: "MenuSong",
  data() {
    return {
      input: "",
      size: 50,
      page: 1,
      page_count: 1,
      myData: [],
      my_show: false,
    }
  },
  methods: {
    getAllSong() {
      const that = this
      this.axios.get("/song/selectSongMap", {params: {page: this.page, size: this.size}}).then(res => {
        // console.log(res)
        that.myData = res.data.row;
        that.page_count = res.data.total
        that.my_show = true
      })
    },
    searchAll() {
      const that = this
      this.axios.get('/song/SelectByUser', {params: {data: that.input}}).then(res => {
        that.my_show = false
        that.myData = res.data
      })
    }
  },
  created() {
    this.getAllSong()
  }
}
</script>

<style scoped>
/*页码居中*/
:deep(.el-pagination) {
  justify-content: center;
}
</style>
