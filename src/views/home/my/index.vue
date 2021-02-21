<template>
  <div class="my" v-if="userInfo">
    <div class="top">
      <div class="top1" @click="setUser">
        <div class="top1_left">
          <div class="top1_name">{{ userInfo.nickname }}</div>
          <div class="top1_txt">{{ userInfo.intro }}</div>
        </div>
        <div class="top1_right">
          <img v-if="userInfo.avatar" :src="baseUrl + userInfo.avatar" alt="" />
          <img v-else src="@/assets/logo.png" alt="" />
        </div>
      </div>
      <ul class="top2">
        <li class="top2_item">
          <div class="top2_num">{{ userInfo.submitNum }}</div>
          <div class="top2_txt">累计答题</div>
        </li>
        <li class="top2_item">
          <div class="top2_num">{{ userInfo.collectArticles.length }}</div>
          <div class="top2_txt">收藏题目</div>
        </li>
        <li class="top2_item">
          <div class="top2_num">{{ userInfo.errorNum }}</div>
          <div class="top2_txt">我的错题</div>
        </li>
        <li class="top2_item">
          <div v-if="userInfo.submitNum" class="top2_num">{{ getNum }}%</div>
          <div v-else class="top2_num">0%</div>
          <div class="top2_txt">正确率</div>
        </li>
      </ul>
      <div class="top3">
        <my-cell
          title="我的岗位"
          :value="userInfo.position"
          icon="&#xe64d;"
          isradius="0"
        ></my-cell>
      </div>
    </div>
    <div class="info">
      <div class="info_content">
        <div class="info_title">
          <h3>面经数据</h3>
        </div>
        <ul class="info_data">
          <li class="info_item">
            <div class="item1">
              昨日阅读<span>+{{ userInfo.shareData.read.yesterday }}</span>
            </div>
            <div class="item2">
              {{ userInfo.shareData.read.total }}
            </div>
            <div class="item3">
              阅读总数
            </div>
          </li>
          <li class="info_item">
            <div class="item1">
              昨日获赞<span>+{{ userInfo.shareData.comment.yesterday }}</span>
            </div>
            <div class="item2">
              {{ userInfo.shareData.comment.total }}
            </div>
            <div class="item3">
              获赞总数
            </div>
          </li>
          <li class="info_item">
            <div class="item1">
              昨日新增<span>+{{ userInfo.shareData.star.yesterday }}</span>
            </div>
            <div class="item2">
              {{ userInfo.shareData.star.total }}
            </div>
            <div class="item3">
              评论总数
            </div>
          </li>
        </ul>
      </div>
      <div class="info_list">
        <my-cell
          title="我的面经分享"
          value="21"
          icon="&#xe655;"
          isradius="1"
        ></my-cell>
        <my-cell
          title="我的消息"
          value="98"
          icon="&#xe656;"
          isradius="1"
        ></my-cell>
        <my-cell
          title="收藏的题库"
          value="32"
          icon="&#xe654;"
          isradius="1"
        ></my-cell>
        <my-cell
          title="收藏的企业"
          value="32"
          icon="&#xe648;"
          isradius="1"
        ></my-cell>
        <my-cell
          title="我的错题"
          value="123"
          icon="&#xe64f;"
          isradius="1"
        ></my-cell>
        <my-cell
          title="收藏的面试经验"
          value="166"
          icon="&#xe649;"
          isradius="1"
        ></my-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyCell from './myCell.vue'
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  },
  components: {
    MyCell
  },
  computed: {
    ...mapState(['userInfo', 'isLogin']),
    getNum () {
      var num = this.userInfo.errorNum / this.userInfo.submitNum
      num = 1 - num
      num = Math.round(num * 100)
      return num
    }
  },
  methods: {
    setUser () {
      this.$router.push('/editUser')
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f7f4f5;
  .top {
    width: 100%;
    padding: 0 @pdd;
    position: relative;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    .top1 {
      display: flex;
      padding-top: 31px;
      justify-content: space-between;
      .top1_left {
        .top1_name {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 30px;
          letter-spacing: 0px;
        }
        .top1_txt {
          padding-top: 6px;
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          line-height: 33/2px;
          letter-spacing: 0px;
        }
      }
      .top1_right {
        padding-right: 22px;
        img {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.38);
          border-radius: 50%;
        }
      }
    }
    .top2 {
      padding-top: 31px;
      display: flex;
      justify-content: space-between;
      .top2_item {
        text-align: center;
        .top2_num {
          font-size: 21px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
          line-height: 24px;
          letter-spacing: 0px;
        }
        .top2_txt {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          line-height: 16px;
          letter-spacing: 0px;
          padding-top: 6px;
          padding-bottom: 55px;
        }
      }
    }
    .top3 {
      position: absolute;
      left: 0;
      bottom: -16px;
      width: 100%;
      padding: 0 @pdd;
    }
  }
  .info {
    width: 100%;
    padding: 56/2px @pdd 0;
    .info_content {
      padding: 19px 15px 16px;
      background-color: #fff;
      .info_title {
        padding-bottom: 18px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        text-align: left;
        color: #181a39;
        line-height: 20px;
        letter-spacing: 0px;
      }
      .info_data {
        display: flex;
        justify-content: space-between;
        .info_item {
          .item1 {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #b4b4bd;
            line-height: 14px;
            letter-spacing: 0px;
            span {
              color: #00b8d4;
            }
          }
          .item2 {
            padding: 10px 0 6px;
            font-size: 21px;
            font-family: DINAlternate, DINAlternate-Bold;
            font-weight: 700;
            text-align: center;
            color: #181a39;
            line-height: 24px;
            letter-spacing: 0px;
          }
          .item3 {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            color: #545671;
            line-height: 16px;
            letter-spacing: 0px;
          }
        }
      }
    }
    .info_list {
      margin-top: 10px;
    }
  }
}
</style>
