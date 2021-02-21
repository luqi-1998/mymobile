<template>
  <div class="detail">
    <!-- 面试技巧详情 -->
    <my-nav-bar :path="url"></my-nav-bar>
    <div class="info">
      <div class="nav" v-if="detailInfo">
        <p>{{ detailInfo.title }}</p>
        <div class="box">
          <div class="left">
            <span>{{ created_at.split('T')[0] }}</span>
          </div>
          <div class="right">
            <span><i class="iconfont">&#xe644;</i>{{ detailInfo.read }}</span>
            <span class="sp"
              ><i class="iconfont">&#xe650;</i>{{ detailInfo.star }}</span
            >
          </div>
        </div>
      </div>
      <div class="ord" v-html="detailInfo.content"></div>
    </div>
  </div>
</template>

<script>
import { technicInfo } from '@/api/find.js'
export default {
  data () {
    return {
      detailInfo: {},
      created_at: '',
      url: ''
    }
  },
  async created () {
    try {
      const id = this.$route.query.id
      this.url = this.$route.query.url
      const res = await technicInfo(id)
      //   console.log(res)
      this.detailInfo = res.data
      this.created_at = res.data.created_at
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  .info {
    padding: 0 @pdd;
    .nav {
      p {
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #181a39;
        line-height: 25px;
      }
      .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 19/2px 0 28px;
        .left {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #b4b4bd;
          line-height: 33/2px;
          letter-spacing: 0px;
        }
        .right {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #b4b4bd;
          line-height: 33/2px;
          letter-spacing: 0px;
          .iconfont {
            padding-right: 5px;
          }
          .sp {
            padding-left: 25px;
          }
        }
      }
    }
    .ord {
      width: 690/2px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
      ::v-deep img {
        width: 690/2px;
      }
      ::v-deep li p {
        padding: 20px 0;
      }
    }
  }
}
</style>
