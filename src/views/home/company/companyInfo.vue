<template>
  <div class="companyInfo">
    <my-nav-bar
      icon1="&#xe63c;"
      path="/home/company"
      icon2="&#xe63e;"
    ></my-nav-bar>
    <div class="info_header">
      <div class="title">
        <div class="left">
          <p>传智播客</p>
          <van-tag text-color="#ddd" plain>标签</van-tag>
          <van-tag text-color="#ddd" plain>标签</van-tag>
          <van-tag text-color="#ddd" plain>标签</van-tag>
        </div>
        <div class="right">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </div>
      <div class="times">
        <div class="item">
          <span><i class="iconfont">&#xe665;</i> 上午9:00-下午6:00</span>
        </div>
        <div class="item">
          <span><i class="iconfont">&#xe664;</i> 双休</span>
        </div>
        <div class="item">
          <span><i class="iconfont">&#xe663;</i> 偶尔加班</span>
        </div>
      </div>
      <div class="tag">
        <div class="item">
          <i class="iconfont">&#xe65c;</i>
          <span>补充医疗保险</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe662;</i>
          <span>定期体检</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe661;</i>
          <span>年终奖</span>
        </div>
        <div class="item">
          <i class="iconfont">&#xe65d;</i>
        </div>
      </div>
    </div>
    <div class="info_main">
      <!-- <van-cell title="公司地址" is-link value="全部地址" /> -->
      <van-cell is-link>
        <template #title>
          <span>公司地址</span>
        </template>
        <span>全部地址</span>
      </van-cell>
      <div class="main_nav">
        <div class="left">
          <div class="txt">
            <span>北京市 昌平区 传智播客</span>
          </div>
          <div class="txt1">
            <span>距离当前50m，步行需要57秒</span>
          </div>
        </div>
        <div class="right">
          <span><i class="iconfont">&#xe65e;</i>导航</span>
        </div>
      </div>
      <div class="main_txt">
        <h3>公司简介</h3>
        <div class="txt">
          传智播客教育集团成立于2006年，旗下拥有黑马程序员、博学谷、院校邦、酷丁鱼和传智汇几大子品牌，和江苏沭阳一所由当地教育局批准并扶持的，一所4年制的大型传智专修学院。其中黑马程序员在IT教育领域里是一个非常知名的品牌，拥有良好的口碑，学生平均就业率为95%，平均就业工资高…于其他培训机构学生20%，现已在全国各大城市开设20个分校，目前开设的课程有JavaEE、Android、PHP、UI设计、iOS、前端与移动开发、C/C++、网络营销、Python、大数据、视频剪辑、新媒体、UI等15个市面热门学科，在北京、上海、广州、深圳、成都、武汉、重庆、郑州、西安、哈尔滨、长沙、济南、杭州、南京、石家庄，安徽合肥，太原，厦门等地已开设分校。集团秉承“为莘莘学子改变命运而讲课，为千万学生少走弯路而著书”。提出“用爱去成就每一位学生的服务理念”。
        </div>
        <div class="bot">
          <span>展开更多<i class="iconfont">&#xe652;</i></span>
        </div>
      </div>
      <div class="main_img">
        <h3>公司照片</h3>
        <div class="img">
          <div class="img_item"></div>
          <div class="img_item"></div>
          <div class="img_item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myNavBar from '../../../components/myNavBar.vue'
export default {
  components: { myNavBar }
}
</script>

<style lang="less" scoped>
.companyInfo {
  .info_header {
    background-color: #4a5d7a;
    padding: 16px @pdd 0;
    opacity: 0.9;
    .title {
      display: flex;
      justify-content: space-between;
      .left {
        p {
          font-size: 20px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 28px;
          letter-spacing: 0px;
          padding: 16px 0 10px 0;
        }
        .van-tag {
          background-color: #4a5d7a;
          //   opacity: 0.1;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          line-height: 33/2px;
          letter-spacing: 0px;
          margin-right: 13/2px;
        }
      }
      .right {
        img {
          width: 116/2px;
          height: 115/2px;
        }
      }
    }
    .times {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
      padding: 51/2px 0;
      .item:last-child {
        margin-right: 74px;
      }
    }
    .tag {
      display: flex;
      justify-content: center;
      padding-bottom: 57/2px;
      .item {
        margin: 0 5px;
        width: 198/2px;
        height: 90/2px;
        opacity: 0.6;
        border: 1/2px solid #ffffff;
        color: #ffffff;
        border-radius: 14/2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconfont {
          font-size: 24px;
          padding: 0 6px;
        }
        span {
          flex: 1;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          line-height: 33/2px;
          letter-spacing: 0px;
        }
      }
      .item:last-child {
        width: 67/2px;
      }
    }
  }
  .info_main {
    padding: 18px 0;
    .main_nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .left {
        .txt {
          font-size: 15px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #181a39;
          line-height: 21px;
          letter-spacing: 0px;
        }
        .txt1 {
          padding-top: 9px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #b4b4bd;
          line-height: 33/2px;
          letter-spacing: 0px;
        }
      }
      .right {
        width: 71px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #ffffff;
        border: 1px solid #b4b4bd;
        border-radius: 17px;
        span {
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #5b5d75;
          line-height: 20px;
          letter-spacing: 0px;
        }
      }
    }
    .main_txt {
      padding: 35px 15px 0;
      h3 {
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #181a39;
        line-height: 25px;
        letter-spacing: 0px;
        padding-bottom: 15px;
      }
      .txt {
        font-size: 15px;
        height: 276/2px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #181a39;
        line-height: 45/2px;
        letter-spacing: 0px;
        overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: wrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
      }
      .bot {
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #545671;
        line-height: 20px;
        letter-spacing: 0px;
        padding-top: 13px;
      }
    }
    .main_img {
      padding: 20px 15px 0;
      h3 {
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #181a39;
        line-height: 25px;
        letter-spacing: 0px;
        padding-bottom: 15px;
      }
    }
  }
}
</style>
