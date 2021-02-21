<template>
  <div class="represent">
    <!-- 发现中数据展示公共组件 -->
    <div
      class="box"
      v-for="(item, index) in technicData"
      @click="details(item.id, url)"
      :key="index"
    >
      <div class="inblock">
        <div class="text">
          <p>
            {{ item.title }}
          </p>
        </div>
        <div class="reads">
          <div class="left">
            <span>{{ item.created_at | getTime }} </span>
          </div>
          <div class="right">
            <span class="see">
              <i class="iconfont">&#xe644;</i>
              <small>{{ item.read }}</small>
            </span>
            <span class="point">
              <i class="iconfont">&#xe650;</i>
              <small>{{ item.star }}</small>
            </span>
          </div>
        </div>
      </div>
      <div class="imgs" v-if="item.cover">
        <img :src="baseUrl + item.cover" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    technicData: Array,
    url: String
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  },
  methods: {
    details (id, url) {
      // console.log(id)
      // console.log(this.url)
      this.$router.push(`/technicDetail?id=${id}&url=${url}`)
    }
  }
}
</script>

<style lang="less" scoped>
.represent {
  width: 100%;
  .box {
    display: flex;
    justify-content: space-between;
  }
  .inblock {
    flex: 1;
    // height: 150/2px;
    .text {
      height: 89/2px;
      overflow: hidden;
      p {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #181a39;
        line-height: 45/2px;
        letter-spacing: 0px;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }
  .reads {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 19/2px 0 57/2px 0;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #b4b4bd;
    line-height: 33/2px;
    letter-spacing: 0px;
    .right {
      .see {
        padding-right: 23px;
        .iconfont {
          //   border: 1px dashed #b4b4bd;
          font-size: 16px;
          margin-right: 15/2px;
        }
      }
    }
    .point {
      .iconfont {
        // border: 1px dashed #b4b4bd;
        font-size: 16px;
        margin-right: 19/2px;
      }
    }
  }
  .imgs {
    // width: 226/2px;
    // height: 150/2px;
    img {
      width: 226/2px;
      height: 150/2px;
    }
  }
}
</style>
