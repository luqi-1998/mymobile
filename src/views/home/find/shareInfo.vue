<template>
  <!-- 面经详情页面 -->
  <div class="shareInfo">
    <my-nav-bar :path="url"></my-nav-bar>
    <div class="main" v-if="shareInfo">
      <div class="header_text">
        <p>
          {{ shareInfo.title }}
        </p>
        <div class="img" v-if="author.avatar">
          <img :src="baseUrl + author.avatar" alt="" />
          <div class="text">
            <p>{{ author.nickname }}</p>
            <span>{{ shareInfo.created_at | getTime }}</span>
          </div>
        </div>
      </div>
      <div class="contion" v-html="shareInfo.content"></div>
      <div class="comment">
        <div class="title">
          <van-badge color="#fff">
            <div class="child">评论</div>
            <template #content>
              <span class="bag">{{ total }}</span>
            </template>
          </van-badge>
        </div>
        <div class="content">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <comments
              ref="comment"
              :id="$route.query.id"
              :list="shareList"
            ></comments>
          </van-list>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="inp" @click="addComment">
        我来补充两句
      </div>
      <div class="icon">
        <div
          class="item"
          :class="{
            red:
              isLogin &&
              userInfo.collectArticles.includes(+this.$route.query.id)
          }"
        >
          <i class="iconfont" @click="collectT">&#xe611;</i><br />
          <span>{{ shareInfo.collect }}</span>
        </div>
        <div
          class="item"
          :class="{
            red:
              isLogin && userInfo.starArticles.includes(+this.$route.query.id)
          }"
        >
          <i class="iconfont" @click="starL">&#xe638;</i><br />
          <span>{{ shareInfo.star }}</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe63e;</i><br />
          <span>{{ shareInfo.share }}</span>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '25%' }">
      <van-field
        v-model="value"
        rows="6"
        autosize
        type="textarea"
        placeholder="请输入留言"
      ></van-field>
      <div>
        <span v-if="value === ''" class="send">发送</span>
        <span v-else class="send col" @click="send">发送</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  share,
  commentNems,
  articlesComments,
  articlesStar,
  articlesCollect
} from '@/api/find.js'
import comments from './commentItem'
import { mapState } from 'vuex'

export default {
  name: 'shareInfo',
  components: {
    comments
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  data () {
    return {
      show: false,
      value: '',
      parent: '',
      url: '',
      total: '',
      text: '',
      shareList: [],
      shareInfo: {},
      author: {},
      baseUrl: process.env.VUE_APP_URL,
      form: {
        limit: 5,
        start: 0
      },
      loading: false,
      finished: false
    }
  },
  watch: {
    show (newValue) {
      if (!newValue) {
        this.value = ''
      }
    }
  },
  methods: {
    async send () {
      try {
        const res = await articlesComments({
          content: this.value,
          article: this.$route.query.id,
          parent: this.parent
        })
        // console.log(res)
        this.shareList.unshift(res.data)
        this.show = false
      } catch (err) {
        console.log(err)
      }
    },
    addComment () {
      this.show = true
    },
    async getData (id) {
      try {
        const res = await share(id)
        this.shareInfo = res.data
        this.author = res.data.author
        // const res1 = await commentNems(id, this.form)
        // console.log(res1)
        // this.total = res1.data.total
        // this.shareList = res1.data.list
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      setTimeout(async () => {
        try {
          this.form.start += this.form.limit
          const res = await commentNems(this.$route.query.id, this.form)
          this.total = res.data.total
          this.shareList.push(...res.data.list)
          this.loading = false
          if (this.shareList.length >= this.total) {
            this.finished = true
          }
        } catch (err) {
          console.log(err)
        }
      }, 3000)
    },
    // 点赞
    async starL () {
      try {
        this.$toast.loading({ duration: 0 })
        const res = await articlesStar({ article: +this.$route.query.id })
        if (res.data.list.includes(+this.$route.query.id)) {
          this.$toast.success({
            message: '点赞成功'
          })
        } else {
          this.$toast.fail({
            message: '取消点赞'
          })
        }
        this.shareInfo.star = res.data.num
        this.$store.dispatch('refreshUserInfo')
        // this.$toast.success()
      } catch (err) {
        console.log(err)
      }
    },
    // 收藏
    async collectT () {
      try {
        this.$toast.loading({ duration: 0 })
        const res = await articlesCollect({ id: +this.$route.query.id })
        if (res.data.list.includes(+this.$route.query.id)) {
          this.$toast.success({
            message: '收藏成功'
          })
        } else {
          this.$toast.fail({
            message: '取消收藏'
          })
        }
        this.shareInfo.collect = res.data.num
        this.$store.dispatch('refreshUserInfo')
        // this.$toast.success()
      } catch (err) {
        console.log(err)
      }
    }
  },

  created () {
    const _id = this.$route.query.id
    this.url = this.$route.query.url
    this.getData(_id)
  }
}
</script>

<style lang="less" scoped>
.shareInfo {
  .main {
    padding: 39/2px @pdd 0;
    .header_text {
      p {
        opacity: 1;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 600;
        text-align: left;
        color: #181a39;
        line-height: 25px;
      }
    }
    .img {
      padding-top: 5px;
      img {
        width: 35px;
        height: 35px;
        opacity: 1;
        border-radius: 50%;
        display: inline-block;
      }
      .text {
        display: inline-block;
        opacity: 1;
        font-size: 12px;
        text-align: left;
        line-height: 33/2px;
        padding-left: 19/2px;
        p {
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #545671;
          letter-spacing: 0px;
        }
        span {
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #b4b4bd;
          letter-spacing: 0px;
        }
      }
    }
    .contion {
      padding-top: 41/2px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
    }
    ::v-deep p img {
      width: 345px;
    }
    .comment {
      padding-top: 36px;

      .title {
        font-size: 18px;
        z-index: 9999;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
        .bag {
          color: #b4b4bd;
          margin-left: 20px;
        }
        ::v-deep .van-badge {
          line-height: 0.9;
        }
      }
    }
    padding-bottom: 95/2px;
  }
  .footer {
    position: fixed;
    bottom: 0px;
    height: 95/2px;
    // width: 345px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .inp {
      width: 378/2px;
      height: 68/2px;
      opacity: 1;
      background: #f7f4f5;
      border-radius: 8/2px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 20px;
      padding: 10px 0 0 20px;
      letter-spacing: 0px;
    }
    .icon {
      .iconfont {
        font-size: 26px;
      }
      span {
        text-align: center;
        padding-left: 8px;
      }
      text-align: center;
      flex: 1;
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 16px;
      letter-spacing: 0px;
    }
  }
  ::v-deep .van-field__body {
    width: 688/2px;
    height: 198/2px;
    opacity: 1;
    background: #f7f4f5;
    border-radius: 8/2px;
  }
  ::v-deep .van-field__control {
    padding: 45px 0 0 15px;
  }
  .send {
    float: right;
    padding-right: 25px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #b4b4bd;
    line-height: 45/2px;
    letter-spacing: 0px;
  }
  .col {
    color: red;
  }
  .red {
    color: red !important;
  }
}
</style>
