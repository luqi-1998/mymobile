<template>
  <div class="company">
    <div class="header">
      <van-search
        v-model="value"
        input-align="center"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #left>
          <span class="title">公司</span>
        </template>
      </van-search>
    </div>
    <div class="swprer">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="nav">
      <div class="left">
        <div class="item">
          <span>推荐</span>
        </div>
        <div class="item">
          <div class="text">
            <span>距离</span>
          </div>
          <div class="icon">
            <i class="iconfont fh">&#xe64a;</i>
            <i class="iconfont fx">&#xe64a;</i>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>评分</span>
          </div>
          <div class="icon">
            <i class="iconfont fh">&#xe64a;</i>
            <i class="iconfont fx">&#xe64a;</i>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item">筛选</div>
      </div>
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <company-item :companyList="companyList"></company-item>
      </van-list>
    </div>
  </div>
</template>

<script>
import { companiesList } from '@/api/company.js'
import companyItem from './companyItem'
export default {
  data () {
    return {
      value: '',
      images: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1819216937,2118754409&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1116376320,3515678711&fm=26&gp=0.jpg'
      ],
      companyList: [],
      form: {
        start: 0,
        limit: 5,
        longitude: 116.403963,
        latitude: 39.915119,
        q: ''
      },
      loading: false,
      finished: false,
      total: ''
    }
  },
  components: {
    companyItem
  },
  methods: {
    onSearch () {},
    onLoad () {
      setTimeout(async () => {
        try {
          this.form.start += this.form.limit
          const res = await companiesList(this.form)
          if (this.total === '') {
            this.total = res.data.total
          }
          this.companyList.push(...res.data.list)
          this.loading = false
          if (this.total <= this.companyList.length) {
            this.finished = true
          }
        } catch (err) {
          console.log(err)
        }
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.company {
  .header {
    .title {
      padding-right: 37/2px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
    }
  }
  .swprer {
    width: 691/2px;
    height: 254/2px;
    margin: 41/2px auto 0;
    img {
      width: 691/2px;
      height: 254/2px;
    }
  }
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px @pdd 0;
    .left {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #222222;
      line-height: 20px;
      letter-spacing: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        padding-right: 40px;
      }
      .text {
        display: inline-block;
      }
      .icon {
        display: inline-block;
        position: relative;
        top: -5px;
        .fh {
          position: absolute;
          top: 12px;
          left: 0;
          display: inline-block;
        }
        .fx {
          display: inline-block;
          transform: rotate(180deg);
        }
      }
    }
    .right {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #222222;
      line-height: 20px;
      letter-spacing: 0px;
    }
  }
}
</style>
