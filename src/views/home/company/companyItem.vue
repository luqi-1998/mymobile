<template>
  <div class="companyItem">
    <div
      class="box"
      @click="goInfo(item.id)"
      v-for="(item, index) in companyList"
      :key="index"
    >
      <div class="left">
        <img v-if="item.logo === ''" src="@/assets/logo.png" alt="" />
        <img v-else :src="baseUrl + item.logo" alt="" />
      </div>
      <div class="right">
        <div class="title">
          <div class="leftItem">
            <p>{{ item.name }}</p>
            <span>{{ item.region.split(',')[1] }} {{ item.distance }}</span>
          </div>
          <div class="rightItem">
            <span>{{ item.score }}分</span>
          </div>
        </div>
        <div class="text">
          <div class="tag">
            <van-tag color="#eee" text-color="#B4B4BD">{{ item.type }}</van-tag>
          </div>
          <div class="info">
            <span>
              在招职位: <small> {{ item.positions }} </small> / 最后更新时间:
              {{ item.updated_at.split('T')[0] }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'companyItem',
  props: {
    companyList: Array
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  },
  methods: {
    goInfo (id) {
      this.$router.push('/companyInfo?id=' + id)
    }
  }
}
</script>

<style lang="less" scoped>
.companyItem {
  padding: 22px @pdd 0;
  .box {
    display: flex;
    justify-content: space-between;
    padding-bottom: 48px;
    .left {
      padding-right: 33/2px;
      img {
        width: 129/2px;
        height: 129/2px;
      }
    }
    .right {
      flex: 1;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftItem {
          p {
            font-size: 18px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            text-align: left;
            color: #19232b;
            line-height: 25px;
          }
          span {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #545671;
            line-height: 33/2px;
            letter-spacing: 0px;
          }
        }
        .rightItem {
          span {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #545671;
            line-height: 33/2px;
            letter-spacing: 0px;
          }
        }
      }
      .text {
        .tag {
          padding-left: 11px;
          padding-bottom: 33/2px;
          .van-tag {
            margin-right: 23/2px;
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #b4b4bd;
            line-height: 33/2px;
            letter-spacing: 0px;
          }
        }
        .info {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #b4b4bd;
          line-height: 33/2px;
          letter-spacing: 0px;
          span {
            small {
              color: #00b8d4;
            }
          }
        }
      }
    }
  }
}
</style>
