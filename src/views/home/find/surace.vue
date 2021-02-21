<template>
  <!-- 面经分享列表 -->
  <div class="surace" v-if="surace.length">
    <div v-for="(item, index) in surace" :key="index" @click="toInfo(item.id)">
      <h2>{{ item.title }}</h2>
      <p>
        {{ item.content }}
      </p>
      <div class="box">
        <div class="left">
          <img :src="baseUrl + item.cover" alt="" />
          <span>{{ item.author.nickname }}</span>
        </div>
        <div class="right">
          <span>{{ item.created_at | getTime }}</span>
          <span class="icon"
            ><i class="iconfont">&#xe65b;</i>{{ item.read }}</span
          >
          <span
            class="gdd"
            :class="{
              red: isLogin && userInfo.starArticles.includes(item.id)
            }"
            ><i class="iconfont">&#xe638;</i>{{ item.star }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'surace',
  props: {
    surace: Array,
    url: String
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  },
  methods: {
    toInfo (id) {
      // console.log(this.url)
      // console.log(id)
      this.$router.push(`/shareInfo?id=${id}&url=${this.url}`)
    }
  },
  created () {
    // this.getData()
  }
}
</script>

<style lang="less" scoped>
.surace {
  h2 {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #181a39;
    line-height: 45/2px;
    letter-spacing: 0px;
  }
  p {
    height: 95/2px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #545671;
    line-height: 37/2px;
    letter-spacing: 0px;
    padding: 23/2px 0 27/2px;
  }
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    padding-bottom: 45px;
    .left {
      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
      span {
        padding-left: 10px;
        letter-spacing: 0px;
        text-align: left;
        color: #545671;
      }
    }
    .right {
      text-align: left;
      color: #b4b4bd;
      line-height: 33px;
      letter-spacing: 0px;
      .icon {
        padding: 0 23px;
      }
    }
    .red {
      color: red !important;
    }
  }
}
</style>
