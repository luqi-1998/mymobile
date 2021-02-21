<template>
  <!-- 发现主页面 -->
  <div class="find">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <my-nav-bar title="发现" :isshow="0"></my-nav-bar>
      <van-cell is-link value="查看更多" @click="$router.push('/technicList')">
        <template #title>
          <span class="tit">面试技巧</span>
        </template>
      </van-cell>
      <div class="content">
        <repre :technicData="technicData" :url="this.$route.fullPath"></repre>
      </div>
      <van-cell
        class="find_data"
        is-link
        value="查看更多"
        @click="$router.push('/chart')"
      >
        <template #title>
          <span class="tit">市场数据</span>
        </template>
      </van-cell>
      <div class="btn_xuan content">
        <div class="span_btn">
          <span class="sp1">{{ hotData.city }}</span>
          <span class="sp2">{{ hotData.position }}</span>
        </div>
        <ul>
          <li v-for="(item, index) in hotData.yearSalary" :key="index">
            <div class="item" v-show="index < ishow">
              <span>{{ item.year }}</span>
              <van-slider
                :max="max"
                v-model="item.sample"
                disabled
                active-color="#ee0a24"
              >
                <template #button>
                  <span class="num">￥{{ item.sample }}</span>
                </template>
              </van-slider>
              <i v-if="item.percent < 0" class="iconfont col1">&#xe64e;</i>
              <i class="iconfont col2" v-else>&#xe651;</i>
              <span class="p12" v-if="item.percent">{{ item.percent }}%</span>
              <span class="p12" v-else>0%</span>
            </div>
          </li>
        </ul>
        <div class="input_show">
          <p @click="ishowList">
            {{ inp_txt }}<i class="iconfont">&#xe652;</i>
          </p>
        </div>
      </div>
      <van-cell
        class="find_data"
        is-link
        value="查看更多"
        @click="$router.push('/shareList')"
      >
        <template #title>
          <span class="tit">面经分享</span>
        </template>
      </van-cell>
      <div class="surface content">
        <surace :surace="surace" :url="this.$route.fullPath"></surace>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { technicList, hotData, articlesShare } from '@/api/find.js'
import surace from './surace'
export default {
  name: 'find',
  data () {
    return {
      total: 0,
      ishow: 4,
      inp_txt: '展开更多',
      technicData: [],
      // 分享面经
      surace: [],
      isLoading: false,
      form: {
        start: 0,
        limit: 3,
        q: ''
      },
      hotData: {}
    }
  },
  components: {
    surace
  },
  computed: {
    max () {
      let max = 0
      this.hotData.yearSalary.forEach(element => {
        if (element.sample > max) {
          max = element.sample
        }
      })
      return max
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
        this.technicData = []
        this.getData()
        this.getHotData()
      }, 2000)
    },
    onLoad () {
      // 下拉加载
      setTimeout(() => {
        if (this.refreshing) {
          this.technicData = []
          this.refreshing = false
        }
        this.form.start += this.form.limit
        this.getData()
        this.loading = false
        if (this.form.start >= this.total) {
          this.finished = true
        }
      }, 2000)
    },
    ishowList () {
      if (this.inp_txt === '展开更多') {
        this.inp_txt = '收缩更多'
        this.ishow = 7
      } else {
        this.inp_txt = '展开更多'
        this.ishow = 4
      }
    },
    async getData () {
      try {
        const res = await technicList(this.form)
        // 分享面经
        const res1 = await articlesShare(this.form)
        this.surace = res1.data.list
        // this.technicData = res.data.list
        this.technicData.push(...res.data.list)
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
    },
    async getHotData () {
      try {
        const res = await hotData()
        if (res.code === 200) {
          // console.log(res)
          this.hotData = res.data
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted () {
    this.getData()
    this.getHotData()
  },
  activated () {
    const _top = this.$route.meta.scrollTop || 0
    window.scrollTo(0, _top)
  }
}
</script>

<style lang="less" scoped>
.find {
  background-color: #f7f4f5;
  .tit {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .content {
    padding: 0 @pdd;
  }
  .find_data {
    padding-top: 10px;
  }
  .btn_xuan {
    // padding-top: 55/2px;
    .span_btn {
      .sp1 {
        display: inline-block;
        // width: 41px;
        height: 24px;
        background: #eceaea;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        line-height: 20px;
        letter-spacing: 0px;
        margin-right: 41/2px;
      }
      .sp2 {
        display: inline-block;
        // width: 70px;
        height: 24px;
        background: #eceaea;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        line-height: 20px;
        letter-spacing: 0px;
      }
    }
    .input_show {
      padding: 23px 0 19px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #545671;
      line-height: 20px;
      letter-spacing: 0px;
    }
    ul {
      .item {
        font-size: 14px;
        padding-top: 51/2px;
        span {
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #545671;
          line-height: 20px;
          letter-spacing: 0px;
          &:nth-child(1) {
            padding-right: 11px;
          }
        }
        .p12 {
          padding-left: 8px;
        }
        .col1 {
          color: #fe6d67;
        }
        .col2 {
          color: #00d47a;
        }
        .iconfont {
          padding-left: 14px;
        }
        .num {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 15px;
          letter-spacing: 0px;
        }
      }
    }
    ::v-deep.van-slider {
      width: 50%;
      display: inline-block;
      height: 12px;
    }
    ::v-deep.van-slider__button-wrapper,
    ::v-deep.van-slider__button-wrapper-right {
      right: 30%;
    }
  }
}
</style>
