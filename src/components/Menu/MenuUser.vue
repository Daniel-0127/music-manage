<template>
  <div>
    <div style="width: 300px;margin-bottom: 10px">
      <el-input style="width: 200px;" v-model="input" placeholder="筛选用户: " @keyup.enter="searchAll"/>
      <el-button style="margin-left: 10px" type="primary" @click="searchAll">搜索</el-button>
    </div>

    <el-table :data="myData" style="width: 100%;height: 545px;overflow-y: auto;" :cell-style="{textAlign:'center'}"
              :header-cell-style="{textAlign:'center'}" stripe border>
      <el-table-column prop="id" label="ID" width="60"/>
      <el-table-column label="用户头像" width="120">
        <template #default="scope">
          <img :src="global.UserPath+scope.row.id+'.jpg'" alt="图片" style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户" width="120"/>
      <el-table-column label="性别" width="80">
        <template #default="scope">
          {{ scope.row.sex === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column label="生日" width="120">
        <template #default="scope">
          <span v-format-time="{format:'YYYY-MM-DD',time:scope.row.birth}"></span>
        </template>
      </el-table-column>
      <el-table-column prop="phone_number" label="电话" width="120"/>
      <el-table-column  label="介绍" width="350">
        <template #default="scope">
          <div id="text">{{ scope.row.introduce }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleLove(scope.row)">查看收藏</el-button>
          <el-button v-if="scope.row.deleted===false" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
          <el-button v-else size="small" type="success" @click="handleRecover(scope.row)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 18px" v-show="my_show" background layout="prev, pager, next," v-model:page-count="page_count"
                   v-model:current-page="page"
                   @update:current-page="getAllUser"/>
  </div>
</template>

<script>
import global from '@/global'

export default {
  name: "MenuUser",
  data() {
    return {
      page: 1,
      size: 5,
      page_count: 1,
      input: "",
      my_show: false,
      myData: [],
    }
  },
  computed: {
    global() {
      return global
    }
  },
  methods: {
    //查询所有
    getAllUser() {
      const that = this
      this.axios.get('/user/MySelectByPage', {params: {size: this.size, page: this.page}}).then((res) => {
        // console.log(res)
        that.myData = res.data.MyData
        that.page_count = res.data.PageSum
        that.my_show = true

      })
    },
    // 根据条件查询
    searchAll() {
      const that = this
      this.axios.get('/user/SelectByUsernameList', {
        params: {
          data: this.input
        }
      }).then((res) => {
        // console.log(res.data)
        that.my_show = false
        that.myData = res.data
      })
    },
    //查看收藏
    handleLove(row) {
      console.log(row)
    },
    //删除用户
    handleDelete(row) {
      this.axios.delete('/user/remove', {params: {id: row.id}}).then(res => {
        if (res.data === true) {
          this.$message.success('删除成功！')
          this.$router.push({path: '/MyEmpty', query: {id: 1}})
        } else {
          this.$message.error('未知错误！')
        }
      })
    },
    //恢复用户
    handleRecover(row) {
      this.axios.put('/user/recover', {id:row.id}).then(res => {
        // console.log(res)
        if (res.data === true) {
          this.$message.success('恢复成功！')
          this.$router.push({path: '/MyEmpty', query: {id: 1}})
        } else {
          this.$message.error('未知错误！')
        }
      })
    }
  },
  created() {
    this.getAllUser()
  },
}
</script>

<style scoped>
:deep(el-table-column) {
  height: 200px;
}

/*#text {*/
/*  height: 80px;*/
/*  !*width: 100px;*!*/
/*  overflow-y: scroll;*/
/*}*/

/*页码居中*/
:deep(.el-pagination) {
  justify-content: center;
}
</style>
