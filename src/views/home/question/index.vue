<template>
  <div class="question" v-if="indexList.length">
    <van-dropdown-menu>
      <van-dropdown-item ref="cityToggle">
        <template #title>
          <span class="f36"
            >面试宝典<small>{{ city }}</small></span
          >
        </template>
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          input-align="center"
        />
        <van-index-bar :index-list="indexList">
          <div v-for="(item, key, index) in cityObj" :key="index">
            <van-index-anchor class="title" :index="key">{{
              key
            }}</van-index-anchor>
            <van-cell
              v-for="(item1, index1) in item"
              :key="index1"
              :title="item1"
              @click="changeCity(item1)"
            />
          </div>
        </van-index-bar>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="box">
      <div class="content">
        <div class="tag-area">
          <van-tag
            @click="changeTag(index, item.id)"
            class="tag"
            :class="{ active: activeIndex === index }"
            color="#F7F4F5"
            text-color="#545671"
            v-for="(item, index) in cityPositions[city]"
            :key="index"
            >{{ item.name }}</van-tag
          >
        </div>
      </div>
      <div class="mollie">
        <div class="modlie-top">
          <div class="mobile-item">
            <div class="item-icon">
              <i class="iconfont">&#xe64f;</i>
            </div>
            <div class="item-txt">常错题库</div>
          </div>
          <div class="mobile-item">
            <div class="item-icon col1">
              <i class="iconfont">&#xe654;</i>
            </div>
            <div class="item-txt">收藏题库</div>
          </div>
        </div>
        <div class="modlie-bottom">
          <div class="mobile-item">
            <div class="item-icon col2">
              <i class="iconfont">&#xe648;</i>
            </div>
            <div class="item-txt">企业题库</div>
          </div>
          <div class="mobile-item">
            <div class="item-icon col3">
              <i class="iconfont">&#xe655;</i>
            </div>
            <div class="item-txt">已答题库</div>
          </div>
        </div>
        <van-circle
          class="circle"
          layer-color="none"
          :color="gradientColor"
          v-model="currentRate"
          :rate="50"
          :speed="200"
        >
          <div class="title">
            <div class="t1">顺序刷题</div>
            <div class="t2">
              {{ userInfo.correctQuestions.length }}/{{ totalCount }}
            </div>
          </div>
        </van-circle>
      </div>
      <div class="nums">
        <div class="nums-top">累计收录</div>
        <div class="nums-bottom">{{ Number(totalCount).toLocaleString() }}</div>
      </div>
      <div class="btn">
        <van-button color="#00B8D4" block @click="toTopic">模拟面试</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { interviewFilters } from '@/api/question'
import { mapState } from 'vuex'
export default {
  name: 'question',
  data () {
    return {
      city: '全国',
      type: '',
      searchValue: '',
      indexList: [],
      cityObj: {},
      cityPositions: {},
      activeIndex: 0,
      currentRate: 50,
      gradientColor: {
        '0%': ' rgba(228,1,55,0.70)',
        '100%': 'rgba(228,1,55,0.30)'
      },
      questionArr: [],
      totalCount: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    changeCity (item) {
      this.city = item
      this.activeIndex = 0
      this.type = this.cityPositions[item][0].id
      this.$refs.cityToggle.toggle()
    },
    changeTag (index, type) {
      this.activeIndex = index
      this.type = type
    },

    toTopic () {
      this.$router.push(`/brushTopic?city=${this.city}&&type=${this.type}`)
    }
  },
  async created () {
    try {
      const res = await interviewFilters()
      // console.log(res)
      this.indexList = Object.keys(res.data.citys)
      this.cityObj = res.data.citys
      this.city = this.indexList[0]
      this.cityPositions = res.data.cityPositions
      this.type = res.data.cityPositions[this.city][0].id
      this.totalCount = res.data.totalCount
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="less" scoped>
.question {
  height: 90%;
  background-color: #f7f4f5;
  .box {
    background-color: #f7f4f5;
    padding-bottom: 80px;
  }
  .title {
    height: 40px;
    background-color: #f7f4f5;
  }
  .f36 {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
    small {
      padding: 0 6px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #545671;
      line-height: 33/2px;
    }
  }
  .content {
    padding: 49/2px @pdd;
    background-color: #fff;
    .tag-area {
      display: flex;
      justify-content: space-between;
      overflow: auto;
      .tag {
        border-radius: 16px !important;
        padding: 11/2px 12px;
        flex: 0 0 auto;
        margin-right: 31/2px;
      }
      .active {
        background-color: #00b8d4 !important;
        color: #fff !important;
      }
    }
  }
  .mollie {
    margin-top: 15px;
    padding: 33/2px 87/2px;
    background-color: #fff;
    position: relative;
    .modlie-top {
      display: flex;
      justify-content: space-between;
      .item-icon {
        width: 44px;
        height: 44px;
        background: linear-gradient(180deg, #ff8080, #ff4949);
        border-radius: 50%;
        color: #fff;
        line-height: 44px;
        text-align: center;
        .iconfont {
          font-size: 24px;
        }
      }
      .col1 {
        background: linear-gradient(180deg, #ffda05, #ffb302);
      }
      .item-txt {
        margin-top: 13/2px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #545671;
        line-height: 33/2px;
        letter-spacing: 0px;
      }
    }
    .modlie-bottom {
      padding-top: 33px;
      display: flex;
      justify-content: space-between;
      .item-icon {
        width: 44px;
        height: 44px;
        background: linear-gradient(180deg, #ff8080, #ff4949);
        border-radius: 50%;
        color: #fff;
        line-height: 44px;
        text-align: center;
        .iconfont {
          font-size: 24px;
        }
      }
      .col2 {
        background: linear-gradient(180deg, #00ddec, #00b8d4);
      }
      .col3 {
        background: linear-gradient(180deg, #3ee5b1, #1dc779);
      }
      .item-txt {
        margin-top: 13/2px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #545671;
        line-height: 33/2px;
        letter-spacing: 0px;
      }
    }
    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 119px;
      height: 119px;
      background-image: url(~@/assets/cirle.png);
      background-size: 100%;
      transform: translate(-50%, -50%);
      padding: 10px;
      .title {
        width: 100px;
        height: 100px;
        background: linear-gradient(180deg, #ff6f92, #e40137);
        border-radius: 50%;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 45/2px;
        text-align: center;
        padding-top: 26px;
        letter-spacing: 0px;
      }
    }
  }
  .nums {
    margin-top: 15px;
    width: 750/2px;
    height: 260/2px;
    text-align: center;
    background: #ffffff;
    .nums-top {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #545671;
      line-height: 25px;
      letter-spacing: 0px;
      padding: 21px 0;
    }
    .nums-bottom {
      font-size: 30px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #545671;
      line-height: 84/2px;
      letter-spacing: 1/2px;
    }
  }
  .btn {
    margin-top: 15px;
    padding: 0 @pdd;
    font-size: 16px !important;
  }
  ::v-deep .van-index-anchor {
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #939393;
    line-height: 40px;
    letter-spacing: 0px;
  }
  ::v-deep .van-dropdown-item__content {
    max-height: 100% !important;
  }
  ::v-deep .van-index-bar__sidebar {
    top: 40%;
  }
  ::v-deep .van-index-bar__index {
    padding: 13/2px 15/2px 13/2px 0;
  }
}
</style>
