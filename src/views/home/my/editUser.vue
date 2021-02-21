<template>
  <div class="editUser">
    <my-nav-bar title="我的资料" path="/home/my"></my-nav-bar>
    <div class="content">
      <van-cell center is-link @click="updata">
        <template #title>
          <span class="avatar">头像</span>
        </template>
        <img v-if="userInfo.avatar" :src="baseUrl + userInfo.avatar" alt="" />
        <img v-else src="@/assets/logo.png" alt="" />
      </van-cell>
      <div class="main">
        <van-cell
          class="top3_tip"
          title="昵称"
          is-link
          :value="userInfo.nickname"
          center
          @click="editName"
        ></van-cell>
        <van-cell
          class="top3_tip"
          title="性别"
          is-link
          @click="showge"
          :value="
            userInfo.gender === 0 ? '未知' : userInfo.gender === 1 ? '男' : '女'
          "
          center
        ></van-cell>
        <van-cell
          @click="openCity"
          class="top3_tip"
          title="地区"
          is-link
          :value="areaList.city_list[userInfo.area]"
          center
        ></van-cell>
        <van-cell
          @click="openIntro"
          class="top3_tip"
          title="个人简介"
          is-link
          :value="
            userInfo.intro === '' ? '主任有点懒，什么都没有写' : userInfo.intro
          "
          center
        ></van-cell>
      </div>
      <van-button class="btn" @click="logout" block>退出登录</van-button>
    </div>
    <van-dialog
      v-model="show"
      title="头像"
      show-cancel-button
      :beforeClose="beforeClose"
    >
      <van-uploader
        class="imageAvatar"
        v-model="fileList"
        :before-read="beforeRead"
        :after-read="afterRead"
        multiple
        :max-count="1"
      />
    </van-dialog>
    <van-dialog
      v-model="isshow"
      title="昵称"
      show-cancel-button
      :beforeClose="beforeNameClose"
    >
      <van-field
        class="inputValue"
        v-model="fromdata.nickname"
        :placeholder="userInfo.nickname"
      ></van-field>
    </van-dialog>
    <van-action-sheet
      v-model="gendarshow"
      :actions="actions"
      @select="onSelect"
    />
    <van-dialog
      v-model="introShow"
      title="个人简介"
      show-cancel-button
      :beforeClose="beforeIntroClose"
    >
      <van-field
        :placeholder="userInfo.intro"
        rows="6"
        autosize
        type="textarea"
        v-model="fromdata.intro"
      ></van-field>
    </van-dialog>
    <van-popup v-model="showCity" position="bottom" @close="close">
      <van-area
        title="地区"
        ref="areas"
        @change="changeL"
        :area-list="areaList"
        :columns-num="2"
        :value="areaInfo"
    /></van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeToken } from '@/utils/token.js'
// import MyNavBar from '../../../components/myNavBar.vue'
import { Dialog } from 'vant'
import { auInfo, upload, auEdit } from '@/api/my.js'
import area from '@/assets/js/area.js'
export default {
  name: 'editUser',
  data () {
    return {
      show: false,
      isshow: false,
      gendarshow: false,
      introShow: false,
      showCity: false,
      areaList: area,
      areaInfo: '',
      fileList: [],
      actions: [
        { name: '未知', gender: 0 },
        { name: '男', gender: 1 },
        { name: '女', gender: 2 }
      ],
      fromdata: {},
      baseUrl: process.env.VUE_APP_URL
    }
  },
  watch: {
    async show (newValue) {
      if (!newValue) {
        this.fileList = []
        this.fromdata = {}
      }
    },
    async isshow (newValue) {
      if (!newValue) {
        this.fromdata = {}
      }
    },
    async gendarshow (newValue) {
      if (!newValue) {
        this.fromdata = {}
      }
    },
    async introShow (newValue) {
      if (!newValue) {
        this.fromdata = {}
      }
    }
  },
  methods: {
    // 点击返回
    backOut () {
      this.$router.push('/home/my')
    },
    // 点击退出，去往登录页面
    logout () {
      Dialog.confirm({
        title: '退出',
        message: '是否退出'
      })
        .then(() => {
          // on confirm
          // 清除token
          removeToken()
          // 将vuex中isLogin改为false
          this.$store.commit('setLogin', false)
          // 跳转至登录页面
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    // 点击上传，弹出上传对话框
    updata () {
      this.show = true
    },
    // 上传之前的操作
    beforeRead (file) {
      if (file.type !== 'image/jpeg') {
        this.$toast('请上传 jpg 格式图片')
        return false
      }
      return true
    },
    // 上传成功执行把图片上传至服务端
    async afterRead (file) {
      var fromnum = new FormData()
      fromnum.append('files', file.file)
      try {
        const res = await upload(fromnum)
        if (res.code === 200) {
          this.fromdata.avatar = res.data[0].id
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 对话框关闭之前的操作
    async beforeClose (action, done) {
      if (action === 'confirm') {
        try {
          const res = await auEdit(this.fromdata)
          if (res.code === 200) {
            this.$toast.success('用户头像修改成功')
            this.$store.dispatch('refreshUserInfo')
            done()
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        done()
      }
    },
    async beforeNameClose (action, done) {
      if (action === 'confirm') {
        try {
          const res = await auEdit(this.fromdata)
          if (res.code === 200) {
            this.$toast.success('用户昵称修改成功')
            this.$store.dispatch('refreshUserInfo')
            done()
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        done()
      }
    },
    // 修改用户昵称弹出框
    editName () {
      this.isshow = true
    },
    // 修改用户性别弹框
    showge () {
      this.gendarshow = true
    },
    // 下拉选择性别
    async onSelect (item) {
      this.fromdata.gender = item.gender
      try {
        const res = await auEdit(this.fromdata)
        if (res.code === 200) {
          this.$toast.success('用户昵称修改成功')
          this.$store.dispatch('refreshUserInfo')
          this.gendarshow = false
        }
      } catch (err) {
        console.log(err)
      }
    },
    openIntro () {
      this.introShow = true
    },
    async beforeIntroClose (action, done) {
      if (action === 'confirm') {
        try {
          const res = await auEdit(this.fromdata)
          if (res.code === 200) {
            this.$toast.success('用户简介修改成功')
            this.$store.dispatch('refreshUserInfo')
            done()
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        done()
      }
    },
    openCity () {
      this.showCity = true
    },
    async close () {
      // console.log(555)
      // 发起请求
      try {
        this.$toast.loading({
          message: '加载中...',
          duration: 0
        })
        const res = await auEdit(this.fromdata)
        if (res.code === 200) {
          this.$toast.success('修改成功')
          // 清空fromdata
          this.fromdata = {}
          // 清空area
          this.$refs.areas.reset()
          // 数据更新
          const res1 = await auInfo()
          if (res1.code === 200) {
            this.$store.commit('setUserInfo', res1.data)
            this.$store.dispatch('refreshUserInfo')
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    changeL (picker, index, value) {
      this.fromdata.area = index[1].code
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.areaInfo = this.userInfo.area
  }
}
</script>

<style lang="less" scoped>
.editUser {
  background-color: #f7f4f5;
  height: 100%;
  .content {
    padding: 37/2px @pdd 0;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f00;
    }
    .avatar {
      // padding-left: 12px;
      font-size: 15px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      line-height: 21px;
      letter-spacing: 0px;
    }
    .main {
      margin-top: 10px;
      background-color: #fff;
    }
    .btn {
      margin-top: 15px;
      width: 690/2px;
      height: 100/2px;
      background: #ffffff;
      border-radius: 8px;
      span {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #e40137;
        line-height: 23px;
        letter-spacing: 0px;
      }
    }
  }
  .inputValue {
    border: 1px solid #ccc;
    padding-top: 15px;
  }
  ::v-deep.van-uploader__upload {
    width: 112px;
    height: 112px;
    margin: 10px 0 10px 105px;
  }
  ::v-deep.van-uploader__preview {
    width: 112px;
    height: 112px;
    margin: 10px 0 10px 105px;
  }
  ::v-deep.van-uploader__preview-image {
    width: 112px;
    height: 112px;
  }
}
</style>
