<template>
  <div class="brush" v-if="lop">
    <my-nav-bar
      title="刷题"
      @changeToggle="changeTo"
      value="答题卡"
      path="/home/question"
    ></my-nav-bar>
    <div class="content" v-if="list.length">
      <div class="title">
        <P
          >[{{ typeObj[list[currIndex].detail.type] }}]{{
            list[currIndex].detail.title
          }}</P
        >
      </div>
      <van-tag
        v-for="(item, index) in list[currIndex].detail.tag"
        :key="index"
        class="tag"
        color="#f7f4f5"
        text-color="#B4B4BD"
        >{{ item }}</van-tag
      >
      <ul class="select" v-if="list[currIndex].detail.type === 1">
        <li
          class="select-item iconfont"
          @click="liClick(index)"
          :class="{
            active: ans1 === str[index],
            right:
              list[currIndex].answer &&
              list[currIndex].answer.singleAnswer === str[index],
            error:
              list[currIndex].answer &&
              list[currIndex].answer.singleAnswer !== str[index] &&
              ans1 === str[index]
          }"
          v-for="(item, index) of list[currIndex].detail.option"
          :key="index"
        >
          <span>{{ str[index] }}. </span>{{ item }}
        </li>
      </ul>
      <ul class="select" v-else-if="list[currIndex].detail.type === 2">
        <li
          class="select-item iconfont"
          @click="liClick1(index)"
          :class="{
            active: ans2.includes(str[index]),
            right:
              list[currIndex].answer &&
              list[currIndex].answer.multipleAnswer.includes(str[index])
          }"
          v-for="(item, index) of list[currIndex].detail.option"
          :key="index"
        >
          <span>{{ str[index] }}. </span>{{ item }}
        </li>
      </ul>
      <div class="fails" v-else>
        <van-field
          v-model="ans3"
          rows="5"
          class="fieldV"
          type="textarea"
          @input="changeValue"
          placeholder="请输入留言"
        />
      </div>
      <div class="answer" v-if="list[currIndex].answer">
        <h3 class="answer-title">答案解析</h3>
        <div class="answer-info">
          <span v-if="list[currIndex].detail.type === 1"
            >正确答案: {{ list[currIndex].answer.singleAnswer }}</span
          >
          <span v-else-if="list[currIndex].detail.type === 2"
            >正确答案:
            {{ list[currIndex].answer.multipleAnswer.join(',') }}</span
          >
        </div>
        <div class="answers-nums">
          <div class="item">
            难度：{{ difficultyObj[list[currIndex].answer.difficulty] }}
          </div>
          <div class="item">
            提交次数：{{ list[currIndex].answer.submitNum }}
          </div>
          <div class="item">
            正确次数：{{ list[currIndex].answer.correctNum }}
          </div>
        </div>
        <div class="answer-txt">
          {{ list[currIndex].answer.answerAnalysis }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="b1">
        <div class="icon">
          <i class="iconfont">&#xe649;</i>
        </div>
        <div class="txt">收藏</div>
      </div>
      <div class="b1">
        <div class="icon">
          <i class="iconfont">&#xe606;</i>
        </div>
        <div class="txt">反馈</div>
      </div>
      <div class="b2">
        <span>{{ currIndex + 1 }}</span
        >/{{ nums }}题
      </div>
      <van-button
        v-if="nextIndex === 1"
        class="b3"
        :disabled="step === 1"
        @click="submit"
        >提交</van-button
      >
      <van-button v-else-if="nextIndex === 2" class="b3" @click="nextTo"
        >下一题</van-button
      >
      <van-button v-else class="b3">结束</van-button>
    </div>
    <van-popup v-model="show" position="top" :style="{ height: '80%' }">
      <ul class="tag-nums">
        <li
          v-for="(item, index) in list"
          :key="index"
          @click="setClick(index)"
          class="tag-item"
          :class="{ txt: list[index].answer }"
        >
          {{ index + 1 }}
        </li>
        <li class="tag-item clear"></li>
        <li class="tag-item clear"></li>
        <li class="tag-item clear"></li>
        <li class="tag-item clear"></li>
        <li class="tag-item clear"></li>
        <li class="tag-item clear"></li>
        <li class="tag-item clear"></li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import {
  interviewQuestions,
  questionsSubmit,
  questionsId
} from '@/api/question'
export default {
  data () {
    return {
      lop: true,
      show: false,
      form: {
        city: this.$route.query.city,
        type: this.$route.query.type
      },
      list: [],
      step: 1,
      nextIndex: 1, // 是否下一题
      currIndex: 0,
      typeObj: { 1: '单选', 2: '多选', 3: '简答' },
      difficultyObj: { 1: '简单', 2: '一般', 3: '困难' },
      str: 'ABCDEFG',
      nums: '',
      ans1: '', // 单选答案
      ans2: [], // 多选答案
      ans3: '' // 简答答案
    }
  },
  methods: {
    // 单选
    liClick (index) {
      if (this.step < 3) {
        this.ans1 = this.str[index]
        this.step = 2
      }
    },
    changeTo () {
      this.show = true
    },
    // 多选
    liClick1 (index) {
      if (this.step < 3) {
        const _index = this.ans2.indexOf(this.str[index])
        if (_index !== -1) {
          this.ans2.splice(_index, 1)
        } else {
          this.ans2.push(this.str[index])
        }
        console.log(this.ans2)
        this.step = 2
      }
    },
    // 简答
    changeValue () {
      if (this.ans3.length !== 0) {
        this.step = 2
      } else {
        this.step = 1
      }
    },
    // 选择卡
    async setClick (index) {
      // console.log(index)
      if (this.list[index].answer) {
        this.step = 3
        this.currIndex = index
        this.nextIndex = 2
        this.show = false
      } else {
        console.log(index)
        if (!this.list[index].detail) {
          const res = await questionsId(this.list[index].id)
          this.list[index].detail = res.data
          this.currIndex = index
          this.show = false
          this.step = 1
          this.ans1 = ''
          this.ans2 = []
          this.ans3 = ''
          this.lop = false
          this.$nextTick(() => {
            this.lop = true
          })
        } else {
          this.currIndex = index
          this.step = 1
          this.show = false
        }
      }
    },
    // 提交答案
    async submit () {
      try {
        this.$toast.loading({ duration: 0 })
        const res = await questionsSubmit({
          id: this.list[this.currIndex].id,
          singleAnswer: this.ans1,
          multipleAnswer: this.ans2
        })
        this.list[this.currIndex].answer = res.data
        this.$toast.clear()
        this.step = 3
        if (this.currIndex < this.list.length - 1) {
          this.nextIndex = 2
        } else {
          this.nextIndex = 3
        }

        this.lop = false
        this.$nextTick(() => {
          this.lop = true
        })
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 下一题
    async nextTo () {
      try {
        const res = await questionsId(this.list[this.currIndex + 1].id)
        // console.log(res)
        this.list[this.currIndex + 1].detail = res.data
        this.currIndex = this.currIndex + 1
        this.step = 1
        this.nextIndex = 1
        this.ans1 = ''
        this.ans2 = []
        this.ans3 = ''
        this.lop = false
        this.$nextTick(() => {
          this.lop = true
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async created () {
    try {
      const res = await interviewQuestions(this.form)
      console.log(res)
      this.list = res.data
      this.nums = res.data.length
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="less" scoped>
.brush {
  .content {
    padding: 0 @pdd;
    .title {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      // text-align: justify;
      word-break: break-all;
      word-wrap: break-word;
      color: #181a39;
      line-height: 45/2px;
    }
    .tag {
      margin-right: 15px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 33/2px;
      letter-spacing: 0px;
    }
    .select {
      padding: 57/2px @pdd 0;
      .select-item {
        padding: 15px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        // text-align: justify;
        color: #181a39;
        line-height: 45/2px;
        border: 1px solid #f7f4f5;
        border-radius: 5px;
        margin-bottom: 16px;
      }
      .active {
        border: 1px solid #b4b4bd;
      }
      .right {
        position: relative;
        background-color: #ddfad9;
        color: #1dc779;
        &::after {
          content: '\e604';
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .error {
        position: relative;
        background-color: #ffefea;
        &::after {
          content: '\e605';
          position: absolute;
          right: 10px;
          top: 50%;
          color: #ff4949;
          transform: translateY(-50%);
        }
      }
    }
    .fails {
      padding-top: 20px;
      .fieldV {
        background-color: #ddd;
      }
    }
    .answer {
      padding-top: 51px;
      .answer-title {
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
      }
      .answer-info {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #1dc779;
        line-height: 45/2px;
        padding: 35/2px 0 51/2px 0;
      }
      .answers-nums {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #545671;
        line-height: 33/2px;
        letter-spacing: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f7f4f5;
        .item {
          padding: 5px;
        }
      }
      .answer-txt {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
        line-height: 45/2px;
        padding-bottom: 80px;
        padding-top: 29px;
      }
    }
  }
  .bottom {
    padding: 0 @pdd;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ccc;
    background-color: #fff;
    .b1 {
      flex: 1;
      .iconfont {
        font-size: 28px;
      }
      .txt {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #b4b4bd;
        line-height: 33/2px;
        letter-spacing: 0px;
      }
    }
    .b2 {
      flex: 2;
      color: #545671;
      font-size: 18px;
      span {
        font-size: 22px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #e40137;
        line-height: 31px;
        letter-spacing: 1/2px;
      }
    }
    .b3 {
      flex: 2;
      // width: 196/2px;
      height: 80/2px;
      background: #f00;
      border-radius: 14/2px;
      color: #fff;
    }
  }
  .tag-nums {
    display: flex;
    padding: 20px 10px 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    .tag-item {
      width: 33px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      border: 1px solid #b4b4bd;
      // background: #ddfad9;
      border-radius: 50%;
      margin: 10px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #b4b4bd;
      letter-spacing: 0px;
    }
    .clear {
      // background-color: #fff;
      border: 1px solid #fff;
    }
    .txt {
      background: #ddfad9;
      color: #1dc779;
    }
  }
}
</style>
