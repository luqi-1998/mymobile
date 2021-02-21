<template>
  <div class="home">
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar> -->
    <!-- include="find" -->
    <keep-alive include="find,question">
      <router-view></router-view>
    </keep-alive>
    <van-tabbar
      class="tab"
      active-color="#E40137"
      inactive-color="#B4B4BD"
      :placeholder="true"
      route
    >
      <van-tabbar-item replace to="/home/company" icon="home-o">
        <span>公司</span>
        <template #icon>
          <i class="iconfont">&#xe63b;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/home/question" icon="search">
        <span>刷题</span>
        <template #icon>
          <i class="iconfont">&#xe642;</i>
        </template></van-tabbar-item
      >
      <van-tabbar-item replace to="/home/find" icon="search">
        <span>发现</span>
        <template #icon>
          <i class="iconfont">&#xe63a;</i>
        </template></van-tabbar-item
      >
      <van-tabbar-item replace to="/home/my" icon="search">
        <span>我的</span>
        <template #icon>
          <i class="iconfont">&#xe645;</i>
        </template></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .iconfont {
    font-size: 57/2px;
  }
  .tab {
    height: 54px;
  }
}
</style>
