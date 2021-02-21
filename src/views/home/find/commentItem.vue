<template>
  <!-- 面经分享子组件（列表每一项） -->
  <div class="comment" v-if="list.length">
    <div v-for="(item, index) in list" :key="index">
      <div class="header">
        <div class="left" @click="addCommentItem(item, item.id)">
          <img :src="baseUrl + item.author.avatar" alt="" />
          <div class="text">
            <p>{{ item.author.nickname }}</p>
            <span>{{ item.created_at | getTime }}</span>
          </div>
        </div>
        <div class="right">
          <span
            :class="{
              red: isLogin && userInfo.starComments.includes(item.id)
            }"
            @click="setStar(item)"
            >{{ item.star }}<i class="iconfont">&#xe639;</i></span
          >
        </div>
      </div>
      <div class="title">
        <span>{{ item.content }}</span>
      </div>
      <div class="main">
        <p v-for="(item1, index1) in item.children_comments" :key="index1">
          <span>{{ item1.author }}：{{ item1.content }}</span>
        </p>
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
import { articlesComments, articleCommentsStar } from '@/api/find.js'
import { mapState } from 'vuex'
export default {
  name: 'commentItem',
  props: {
    list: Array,
    id: String
  },
  computed: {
    ...mapState(['userInfo', 'isLogin'])
  },
  data () {
    return {
      CommentItem: '',
      baseUrl: process.env.VUE_APP_URL,
      show: false,
      value: '',
      parent: ''
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
    addCommentItem (item, id) {
      // console.log(item)
      this.CommentItem = item
      this.parent = id
      this.show = true
    },
    // 点赞评论
    async setStar (item) {
      try {
        this.$toast.loading({ duration: 0 })
        const res = await articleCommentsStar({ id: item.id })
        if (res.data.list.includes(item.id)) {
          this.$toast.success({
            message: '点赞成功'
          })
        } else {
          this.$toast.fail({
            message: '取消点赞'
          })
        }
        item.star = res.data.num
        this.$store.dispatch('refreshUserInfo')
        // this.$toast.success()
      } catch (err) {
        console.log(err)
      }
    },
    async send () {
      try {
        const res = await articlesComments({
          content: this.value,
          article: this.id,
          parent: this.parent
        })
        // console.log(res)
        console.log(res)
        this.CommentItem.children_comments.push(res.data)
        this.show = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        display: inline-block;
      }
      .text {
        padding-left: 17/2px;
        display: inline-block;
        font-size: 12px;
        text-align: left;
        line-height: 33/2px;
        letter-spacing: 0px;
        p {
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          color: #545671;
        }
        span {
          padding-top: 5px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #b4b4bd;
        }
      }
    }
    .right {
      span {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #b4b4bd;
        line-height: 33/2px;
        letter-spacing: 0px;
      }
    }
  }
  .title {
    word-break: break-all;
    word-wrap: break-word;
    padding: 11px 0 22px 46px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: justify;
    color: #181a39;
    line-height: 27px;
    letter-spacing: 0px;
  }
  .main {
    width: 594/2px;
    background-color: #f7f4f5;
    margin-left: 46px;
    margin-bottom: 30px;
    p {
      // word-wrap: normal;
      word-break: break-all;
      word-wrap: break-word;
      padding-top: 23/2px;
      color: #545671;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      line-height: 20px;
      letter-spacing: 0px;
      &:nth-child(1) {
        padding-top: 35/2px;
      }
      &:last-child {
        padding-bottom: 44/2px;
      }
      span {
        padding-left: 29/2px;
      }
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
