<template>
  <div class="login">
    <myNavBar path="/home/find"></myNavBar>
    <div class="contion">
      <h3 class="title">您好，请登录</h3>
      <van-form ref="form">
        <van-field
          placeholder="请输入手机号"
          v-model="form.mobile"
          :rules="rules.mobile"
          name="mobile"
        >
          <template #left-icon>
            <i class="iconfont">&#xe60b;</i>
          </template>
        </van-field>
        <van-field
          placeholder="请输入验证码"
          v-model="form.code"
          :rules="rules.code"
        >
          <template #left-icon>
            <i class="iconfont">&#xe60c;</i>
          </template>
          <template #button>
            <span class="button" v-if="timeCode === 61" @click="getCode"
              >获取验证码</span
            >
            <span class="button" v-else>{{ timeCode }}秒后重置</span>
          </template>
        </van-field>
        <div class="userS">
          登录即同意<span> 《用户使用协议》 </span>和<span> 《隐私协议》 </span>
        </div>
        <van-button round block type="danger" @click="loginOn" class="submit"
          >确定</van-button
        >
      </van-form>
    </div>
  </div>
</template>

<script>
import { auCode, auLogin } from '@/api/login.js'
import { setToken, getToken } from '@/utils/token.js'
export default {
  name: 'login',
  data () {
    return {
      timeCode: 61,
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'onChange'
          },
          {
            /* eslint-disable */
            validator: value => {
              return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                value
              )
            },
            /* eslint-enable */
            message: '手机号不合法',
            trigger: 'onChange'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'onChange' }]
      }
    }
  },
  created () {
    if (getToken()) {
      this.$router.push('/home/find')
    }
  },
  methods: {
    // 获取验证码
    getCode () {
      this.$refs.form
        .validate('mobile')
        .then(() => {
          // alert('验证成功')
          this.timeCode--
          var _time = setInterval(() => {
            this.timeCode--
            if (this.timeCode <= 0) {
              clearInterval(_time)
              this.timeCode = 61
            }
          }, 1000)
          this.$toast.loading({
            message: '加载中...',
            duration: 0
          })
          auCode({ mobile: this.form.mobile })
            .then(res => {
              this.$toast.success({
                message: res.data
              })
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$toast({
            type: 'fail',
            message: '手机号验证失败'
          })
        })
    },
    // 登录
    loginOn () {
      this.$refs.form
        .validate()
        .then(() => {
          auLogin(this.form)
            .then(res => {
              this.$toast.success('登录成功')
              setToken(res.data.jwt)
              this.$store.commit('setUserInfo', res.data.user)
              this.$store.commit('setLogin', true)
              const _redirect = this.$route.query.redirect
              if (_redirect && _redirect !== '/login') {
                this.$router.push(_redirect)
              } else {
                this.$router.push('/home/find')
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$toast({
            type: 'fail',
            message: '验证失败'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .contion {
    padding: 0 @pdd;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
      padding: 50px 0 63px;
    }
    .iconfont {
      padding-right: 20px;
    }
    .button {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #00b8d4;
      line-height: 22px;
      letter-spacing: 0px;
    }
    .userS {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      line-height: 16px;
      letter-spacing: 0px;
      padding: 30px 0 44px;
      span {
        color: #00b8d4;
      }
    }
  }
}
</style>
