<template>
  <div id="app">
    <keep-alive include="shareList">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>
