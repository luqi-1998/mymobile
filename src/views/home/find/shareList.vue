<template>
  <div class="shareList">
    <!-- 分享面经列表页 -->
    <my-nav-bar title="分享面经" path="/home/find"></my-nav-bar>
    <div class="content">
      <van-search
        v-model="form.q"
        @search="search"
        show-action
        @clear="clear"
        @cancel="onCancel"
        placeholder="请输入搜索关键词"
      />
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <div class="info" v-if="isHistrory">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <surace :surace="surace" :url="this.$route.fullPath"></surace>
          </van-list>
        </div>
        <div class="histroy" v-else>
          <div class="hotSearch">
            <h4>大家都在搜</h4>
            <div class="tag">
              <van-tag
                color="#F7F4F5"
                class="tagItem"
                @click="getItem(item)"
                v-for="(item, index) in hotList"
                :key="index"
                >{{ item }}</van-tag
              >
            </div>
          </div>
          <div class="histroyS">
            <van-cell>
              <template #title>
                <span class="head">历史搜索</span>
              </template>
              <span @click="clearH">清空</span>
            </van-cell>
            <div class="tag1">
              <van-tag
                color="#F7F4F5"
                class="tagItem"
                @click="getItem(item)"
                v-for="(item, index) in histroyList"
                :key="index"
                >{{ item }}</van-tag
              >
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { articlesShare, shareTopSearch } from '@/api/find.js'
import { setToken, getToken, removeToken } from '@/utils/token.js'
import surace from './surace'
export default {
  name: 'shareList',
  components: {
    surace
  },
  data () {
    return {
      isHistrory: true,
      isLoading: false,
      form: {
        start: 0,
        limit: 5,
        q: ''
      },
      loading: false,
      finished: false,
      surace: [],
      total: 0,
      hotList: [],
      histroyList: JSON.parse(getToken('histroyList')) || []
    }
  },
  methods: {
    onRefresh () {
      this.surace = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onLoad () {
      setTimeout(async () => {
        if (this.isLoading) {
          this.form.start = -5
          this.isLoading = false
        }
        this.form.start += this.form.limit
        const res = await articlesShare(this.form)
        this.surace.push(...res.data.list)
        this.loading = false
        if (this.surace.length >= this.total) {
          this.finished = true
        }
      }, 1000)
    },
    search () {
      this.form.start = 0
      this.surace = []
      this.getData()
      this.histroyList.push(this.form.q)
      setToken(JSON.stringify(this.histroyList), 'histroyList')
      this.finished = false
      this.loading = true
      this.onLoad()
      this.$nextTick(() => {
        this.isHistrory = true
      })
    },
    onCancel () {
      this.isHistrory = false
    },
    clear () {
      this.getData()
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    clearH () {
      this.histroyList = []
      removeToken('histroyList')
    },
    getItem (item) {
      this.form.q = item
    },
    async getData () {
      try {
        const res = await articlesShare(this.form)
        this.surace.push(...res.data.list)
        this.total = res.data.total

        const res1 = await shareTopSearch()
        this.hotList = res1.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getData()
  },
  activated () {
    const _top = this.$route.meta.scrollTop || 0
    window.scrollTo(0, _top)
  }
}
</script>

<style lang="less" scoped>
.shareList {
  .content {
    padding: 0 @pdd;
  }
  .histroy {
    .hotSearch {
      h4 {
        padding-top: 21px;
        padding-left: 15px;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
      }
      .tagItem {
        padding: 8px 11px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #545671;
        line-height: 33/2px;
        letter-spacing: 0px;
        background-color: #f7f4f5;
        margin: 5px 15px;
      }
    }
    .histroyS {
      .head {
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
        padding-top: 21px;
      }
      .tagItem {
        padding: 8px 11px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #545671;
        line-height: 33/2px;
        letter-spacing: 0px;
        background-color: #f7f4f5;
        margin: 5px 15px;
      }
    }
  }
}
</style>
