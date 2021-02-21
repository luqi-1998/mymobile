<template>
  <div>
    <van-cell
      v-if="isradius == 0"
      @click="prositData"
      class="top3_tip active_cell"
      is-link
      :value="value"
      center
    >
      <template #title>
        <span class="custom-title"
          ><i class="iconfont" v-html="icon"></i>{{ title }}</span
        >
      </template>
    </van-cell>
    <van-cell v-else class="top3_tip" is-link :value="value" center>
      <template #title>
        <span class="custom-title"
          ><i class="iconfont" v-html="icon"></i>{{ title }}</span
        >
      </template>
    </van-cell>
    <van-dialog
      v-model="isshow"
      title="我的职位"
      show-cancel-button
      :beforeClose="beforeNameClose"
    >
      <van-field v-model="from.position" placeholder="请输入职位"></van-field>
    </van-dialog>
  </div>
</template>

<script>
import { auEdit, auInfo } from '@/api/my.js'
export default {
  data () {
    return {
      isshow: false,
      from: {}
    }
  },
  watch: {
    async isshow (newValue) {
      if (!newValue) {
        try {
          const res = await auInfo()
          if (res.code === 200) {
            this.$store.commit('setUserInfo', res.data)
            this.from = {}
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  props: ['title', 'value', 'icon', 'isradius'],
  methods: {
    async beforeNameClose (action, done) {
      if (action === 'confirm') {
        try {
          const res = await auEdit(this.from)
          if (res.code === 200) {
            this.$toast.success('我的职位修改成功')
            done()
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        done()
      }
    },
    prositData () {
      this.isshow = true
    }
  }
}
</script>

<style lang="less" scoped>
.top3_tip {
  width: 690/2px;
  height: 110/2px;
  background: #ffffff;
  .custom-title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 23px;
    letter-spacing: 0px;
    i {
      padding-right: 12px;
    }
  }
  .pd9 {
    padding-left: 9px;
  }
}
.active_cell {
  border-radius: 16/2px;
}
::deep.van-cell__value span {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: right;
  color: #5b5d75;
  line-height: 20px;
  letter-spacing: 0px;
}
</style>
