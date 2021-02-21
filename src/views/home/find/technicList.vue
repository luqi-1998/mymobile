<template>
  <div class="technic">
    <!-- 面试技巧 -->
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <my-nav-bar title="面试技巧" path="/home/find"></my-nav-bar>

      <div class="showData">
        <van-search
          class="sreach"
          v-model="form.q"
          placeholder="请输入搜索关键词"
          input-align="center"
          @search="search"
          @clear="clear"
        />
        <div v-if="technicData.length">
          <repre :technicData="technicData" :url="this.$route.fullPath"></repre>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import repre from '@/components/represent.vue'
import { technicList } from '@/api/find.js'
export default {
  components: {
    repre
  },
  data () {
    return {
      isLoading: false,
      technicData: {},
      form: {
        start: 0,
        limit: 99,
        q: ''
      },
      value: ''
    }
  },
  methods: {
    // 搜索
    search () {
      this.getData()
    },
    clear () {
      this.getData()
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
        this.getData()
      }, 1000)
    },
    async getData () {
      try {
        const res = await technicList(this.form)
        this.technicData = res.data.list
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.technic {
  .showData {
    padding: 0 @pdd;
  }
  .sreach {
    padding-bottom: 40px;
  }
}
</style>
