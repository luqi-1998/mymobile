<template>
  <div class="chart">
    <!-- 市场数据 -->
    <my-nav-bar title="市场数据" path="/home/find"></my-nav-bar>
    <van-dropdown-menu>
      <van-dropdown-item :title="form.city" ref="cityTo">
        <van-search v-model="cityName" placeholder="请输入搜索关键词" />
        <van-index-bar>
          <div v-for="(item, key, index) in cityIndex" :key="index">
            <van-index-anchor :index="key" />
            <div v-for="(item1, index1) in item" :key="index1">
              <van-cell :title="item1[0]" @click="getNums(item, index1)" />
            </div>
          </div>
        </van-index-bar>
      </van-dropdown-item>
      <van-dropdown-item :title="form.position" ref="togglePostion">
        <van-search v-model="positionName" placeholder="请输入搜索关键词" />
        <van-cell
          v-for="(item2, index2) in positionList"
          :key="index2"
          :value="item2"
          @click="changePosition(item2)"
        />
      </van-dropdown-item>
    </van-dropdown-menu>
    <div>
      <echart ref="ecahrtRef" :form="form"></echart>
    </div>
    <div></div>
  </div>
</template>

<script>
// import * as echarts from 'echarts'
import echart from '@/components/echart.vue'
import { chartIndexes } from '@/api/find.js'
export default {
  name: 'chartss',
  data () {
    return {
      cityIndex: {},
      positionList: [],
      form: {
        city: '北京',
        position: '技术经理'
      },
      cityName: '',
      positionName: ''
    }
  },
  components: {
    echart
  },
  methods: {
    getNums (item, index1) {
      this.positionList = item[index1][1]
      this.form.city = item[index1][0]
      this.form.position = item[index1][1][0]
      this.$refs.ecahrtRef.getEchart()
      this.$refs.cityTo.toggle()
    },
    changePosition (item) {
      this.form.position = item
      this.$refs.ecahrtRef.getEchart()
      this.$refs.togglePostion.toggle()
    },
    async getData () {
      try {
        const res = await chartIndexes()
        this.cityIndex = res.data
        this.form.city = res.data['热门'][0][0]
        this.form.position = res.data['热门'][0][1][0]
        this.positionList = res.data['热门'][0][1]
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style></style>
