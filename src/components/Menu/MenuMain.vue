<template>
  <div>
    <div id="head">
      <el-row :gutter="32">
        <el-col :span="6">
          <div class="cols1">
            <home-two theme="outline" size="45" fill="#333" style="float: left;width: 50%;"/>
            <div class="text">
              <p>{{ AllUser }}</p>
              <p>用户总数</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cols1">
            <data-user theme="outline" size="45" fill="#333" style="float: left;width: 50%;"/>
            <div class="text">
              <p>{{ AllSong }}</p>
              <p>歌曲总数</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cols1">
            <entertainment theme="outline" size="45" fill="#333" style="float: left;width: 50%;"/>
            <div class="text">
              <p>{{ AllSinger }}</p>
              <p>歌手总数</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="cols1">
            <view-list theme="outline" size="45" fill="#333" style="float: left;width: 50%;"/>
            <div class="text">
              <p>{{ AllAlbum }}</p>
              <p>歌单数量</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="body">
      <el-row :gutter="32">
        <el-col :span="12">
          <div class="cols2">
            <span>用户性别比例</span>
            <div>
              <div id="myChart1"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="cols2">
            <span>歌曲类型</span>
            <div>
              <div id="myChart3"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :span="12">
          <div class="cols2">
            <span>歌手性别比例</span>
            <div>
              <div id="myChart2"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="cols2">
            <span>歌手国籍分布</span>
            <div>
              <div id="myChart4"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {DataUser, Entertainment, HomeTwo, ViewList} from "@icon-park/vue-next";
import echarts from 'echarts'

export default {
  name: "MenuMain",
  data() {
    return {
      userData: [],
      singerData: [],
      AllUser: 0,
      AllSinger: 0,
      AllSong: 0,
      AllAlbum: 0,
    }
  },
  components: {
    HomeTwo, DataUser, Entertainment, ViewList
  },
  methods: {
    getUsers() {
      const that =this
      this.axios.get('/user/selectAllNum', null).then((res) => {
        that.AllUser = res.data
      })
      this.axios.get('/user/selectSexNum', {params: {sex: 1}}).then((res) => {
        that.userData=[{name: '男', value: res.data}]
        this.axios.get('/user/selectSexNum', {params: {sex: 0}}).then((res) => {
          that.userData.push({name: '女', value: res.data})
        })
      })


    },


    initData1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart1'), 'light') // 初始化echarts, theme为light
      // 绘制图表
      myChart.setOption({
        legend: {   //图表上方的图例
          data: ['男', '女']
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '用户占比',
          type: 'pie',
          barWidth: '60%',
          center: ['50%', '55%'],
          data: this.userData,
        }],
      })
    },
    GetSinger() {
      const that =this
      this.axios.get('/singer/selectAllSinger', null).then((res) => {
        that.AllSinger = res.data
      })
      this.axios.get('/singer/selectSexSinger', {params: {sex: 1}}).then((res) => {
        that.singerData=[{name: '男', value: res.data}]
        this.axios.get('/singer/selectSexSinger', {params: {sex: 0}}).then((res) => {
          that.singerData.push({name: '女', value: res.data})
        })
      })

    },
    initData2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart2'), 'light') // 初始化echarts, theme为light
      // 绘制图表
      myChart.setOption({
        legend: {   //图表上方的图例
          data: ['男', '女']
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '歌手占比',
          type: 'pie',
          barWidth: '60%',
          center: ['50%', '55%'],
          data: this.singerData,
        }],
      })
    },
    GetSong() {
      this.axios.get("/song/selectSongNum", null).then((res) => {
        this.AllSong = res.data
      })
      this.axios.get("/song/selectAlbumNum", null).then((res) => {
        this.AllAlbum = res.data
      })
    },
    initData3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart3'), 'light') // 初始化echarts, theme为light
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['华语', '粤语', '欧美', '日韩', 'BGM', '轻音乐', '乐器'],   // x轴数据
          name: '歌曲类型',   // x轴名称
          nameTextStyle: {    // x轴名称样式
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '歌曲类型数',   // y轴名称
          nameTextStyle: {    // y轴名称样式
            fontSize: 18
          }
        },
        tooltip: {   //鼠标放到图上的数据展示样式
          trigger: 'axis'
        },
        series: [{  //series中加入每个bar的数据
          name: '歌曲类型数',
          type: 'bar',
          barWidth: '20%',
          data: [175, 39, 43, 32, 67, 57, 57],
        }],
      })
    },
    initData4() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart4'), 'light') // 初始化echarts, theme为light
      // 绘制图表
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: ['中国', '新加坡', '韩国', '马来西亚', '美国'],   // x轴数据
          name: '国籍',   // x轴名称
          nameTextStyle: {    // x轴名称样式
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          name: '歌手人数',   // y轴名称
          nameTextStyle: {    // y轴名称样式
            fontSize: 18
          }
        },
        tooltip: {   //鼠标放到图上的数据展示样式
          trigger: 'axis'
        },
        series: [{  //series中加入每个bar的数据
          name: '国籍人数',
          type: 'bar',
          barWidth: '20%',
          data: [75, 35, 13, 12, 17],
        }],
      })
    },

  },
  mounted() {
    const that = this
    setTimeout(function () {
      that.initData1()
      that.initData2()
      that.initData3()
      that.initData4()
    }, 250)
  },
  created() {
    this.getUsers();
    this.GetSinger()
    this.GetSong()
  }
}
</script>

<style scoped>
#head :deep(.el-col) .cols1 {
  border-radius: 4px;
  height: 70px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  padding-top: 25px;
}

.cols1 .text {
  float: left;
  width: 30%;

}

.text p {
  display: block;
  margin: -8px 0 9px 0;
  font-size: 14px;
}

.text p:first-child {
  font-weight: bolder;
  font-size: 28px;
}

#body :deep(.el-col) .cols2 {
  border-radius: 4px;
  /*height: 70px;*/

  text-align: center;

  margin-top: 20px;
}

.cols2 {
  font-weight: 600;
}

.cols2 span {
  display: inline-block;
  margin: 2px;
}

.cols2 > div {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  height: 210px;
}

#myChart1, #myChart2, #myChart3, #myChart4 {
  height: 210px;
  width: 100%;
  margin: 0 auto;
}
</style>
