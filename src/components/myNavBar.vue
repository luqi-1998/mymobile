<template>
  <van-nav-bar class="myNav" @click-left="$router.push(path)">
    <template #title>
      <div class="title">{{ title }}</div>
    </template>
    <template #left>
      <i v-if="isshow !== 0" class="iconfont f44">&#xe637;</i>
    </template>
    <template #right>
      <i class="iconfont item" v-html="icon1"></i>
      <i class="iconfont item" v-html="icon2"></i>
      <span class="sp" @click="spanClick">{{ value }}</span>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: ['title', 'path', 'isshow', 'icon1', 'icon2', 'value'],
  methods: {
    spanClick () {
      this.$emit('changeToggle')
    }
  }
}
</script>

<style lang="less" scoped>
.myNav {
  ::v-deep.van-nav-bar__left,
  ::v-deep.van-nav-bar__right {
    padding: 0;
  }
  .f44 {
    font-size: 44px;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
  .item {
    display: inline-block;
    width: 44px;
    height: 44px;
    font-size: 43/2px;
    text-align: center;
    line-height: 44px;
  }
  .sp {
    padding-right: 15px;
  }
}
</style>
