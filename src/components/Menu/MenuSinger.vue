<template>
  <div>
    <div style="width: 300px;margin-bottom: 10px">
      <el-input style="width: 200px;" v-model="input" placeholder="筛选歌手: " @keyup.enter="searchAll"/>
      <el-button style="margin-left: 10px" type="primary" @click="searchAll">搜索</el-button>
    </div>

    <el-table :data="myData" style="width: 100%;height: 545px;overflow-y: auto;" :cell-style="{textAlign:'center'}"
              :header-cell-style="{textAlign:'center'}" stripe border >
      <el-table-column prop="id" label="ID" width="60"/>
      <el-table-column label="歌手头像" width="120">
        <template #default="scope">
          <img :src="global.SingerPath+scope.row.name+'.jpg'" alt="图片" style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌手名" width="120"/>
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
      <el-table-column prop="address" label="出生地" width="120"></el-table-column>
      <el-table-column label="介绍" width="350">
        <template #default="scope">
          <div id="text">{{ scope.row.introduce }}</div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleLove(scope.row)">修改</el-button>

          <el-button v-if="scope.row.deleted===false" size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
          <el-button v-else size="small" type="success" @click="handleRecover(scope.row)">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        v-model="centerDialogVisible"
        title="修改歌手信息"
        width="30%"
        align-center
    >
      <div style="">
        <el-form :model="update_data" ref="ruleForm" label-position="right" label-width="84px">
          <el-form-item label="用户" prop="name" :rules="rules.username">
            <el-input class="el-input" v-model="update_data.name" placeholder="请输入账号" clearable
                      prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="update_data.sex">
              <el-radio-button :label="1" defult>男</el-radio-button>
              <el-radio-button :label="0">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-col :span="11">
              <el-date-picker
                  v-model="update_data.birth"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="出生地">
            <el-input v-model="update_data.address" clearable></el-input>
          </el-form-item>
          <el-form-item label="自我介绍">
            <el-input v-model="update_data.introduce" type="textarea" rows="4"/>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="myUpdate">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
    <el-pagination style="margin-top: 18px" v-show="my_show" background layout="prev, pager, next," v-model:page-count="page_count"
                   v-model:current-page="page"
                   @update:current-page="getAllUser"/>
  </div>
</template>

<script>
import global from '@/global'

export default {
  name: "MenuSinger",
  data() {
    return {
      page: 1,
      size: 5,
      page_count: 1,
      input: "",
      my_show: false,
      centerDialogVisible: false,
      myData: [],
      update_data: null,
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 2, message: '长度在 2 到 16 个字符', trigger: 'blur'}
        ],
        email: [
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          }, {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]
      }
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
      this.axios.get('/singer/MySelectByPage', {params: {size: this.size, page: this.page}}).then((res) => {
        // console.log(res)
        that.myData = res.data.MyData
        that.page_count = res.data.PageSum
        that.my_show = true

      })
    },
    // 根据条件查询
    searchAll() {
      const that = this
      this.axios.get('/singer/selectByNameList', {params: {data: this.input}}).then((res) => {
        // console.log(res.data)
        that.my_show = false
        that.myData = res.data
      })
    },
    //弹出修改框
    handleLove(row) {
      this.centerDialogVisible = true
      this.update_data = row
    },
    //修改
    myUpdate() {
      this.axios.put('/singer/update', this.update_data).then(res => {
        // console.log(res)
        if (res.data === true) {
          this.$message.success("修改成功！")
          this.centerDialogVisible = false
        } else {
          this.$message.error("未知错误！")
          this.centerDialogVisible = false
        }
      })
    },
    //删除歌手
    handleDelete(row) {
      this.axios.delete('/singer/remove', {params: {id: row.id}}).then(res => {
        if (res.data === true) {
          this.$message.success('删除成功！')
          this.$router.push({path: '/MyEmpty', query: {id: 2}})
        } else {
          this.$message.error('未知错误！')
        }
      })
    },
    //恢复歌手
    handleRecover(row) {
      this.axios.put('/singer/recover', {id: row.id}).then(res => {
        if (res.data === true) {
          this.$message.success('恢复成功！')
          this.$router.push({path: '/MyEmpty', query: {id: 2}})
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

#text {
  height: 80px;
  /*width: 100px;*/
  overflow-y: scroll;
}

/*页码居中*/
:deep(.el-pagination) {
  justify-content: center;
}
</style>
