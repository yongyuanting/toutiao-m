<template>
  <div class="home-content">
    <!--    导航-->
    <van-nav-bar class="page-nav-var" fixed>
      <template #title>
        <van-button type="info" size="small" round class="iconfont icon-sousuo search-btn">
          <div class="iconfont icon-sousuo left"></div>
          <div class="right">搜索</div>
        </van-button>
      </template>
    </van-nav-bar>
    <!--    导航-->

    <!--    频道列表-->
    <van-tabs v-model="active" animated swipeable class="channel-tab">
      <van-tab :title="channel.name" :key="channel.id" v-for="channel in channels">
        <!--        文章列表-->
        <article-list v-bind:channel="channel"></article-list>
      </van-tab>
      <!--      占位-->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hbg">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import articleList from './components/article-list'

export default {
  name: 'home',
  // props: {
  //   channel: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  created () {
    this.loadChannles()
  },
  methods: {
    async loadChannles () {
      try {
        const { data: res } = await getUserChannels()
        // console.log(data)
        this.channels = res.data.channels
        // console.log(this.channels)
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  },
  components: {
    articleList
  }
}
</script>

<style lang="less">
.van-tabs__wrap {
  height: 82px;
  position: fixed;
  top: 92px;
  z-index: 1;
  left: 0;
  right: 0;
}

.van-nav-bar__title {
  max-width: unset;
}

.van-tabs__line {
  bottom: 8px;
  width: 31px !important;
  height: 6px !important;
  color: skyblue;
}

.van-tabs__nav {
  padding-bottom: 0;
}
</style>

<style lang="less" scoped>

.home-content {
  padding-top: 174px;
  padding-bottom: 100px;
  //.van-nav-bar__title {
  //  max-width: unset;
  //}
  // 深度设置CSS
  /deep/ .channel-tab {
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333 !important;
    }
  }

  .search-btn {
    width: 550px;
    height: 64px;
    background-color: #5babfb;
    border: none;

    .left {
      float: left;
      text-align: center;
      margin-right: 10px;
      font-size: 32px;
      line-height: 64px;
    }

    .right {
      float: right;
      text-align: center;
      line-height: 64px;
      font-size: 28px;
    }
  }

  .hbg {
    width: 66px;
    height: 82px;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .902;

    i.iconfont {
      font-size: 33px;
    }

    // 找到父元素
    &:before {
      content: '';
      width: 1px;
      height: 100%;
      background-image: url("~@/assets/gradient-gray-line.png");
      position: absolute;
      left: 0;
      background-size: contain;
    }
  }

  .placeholder {
    width: 66px;
    height: 82px;
    // 1是参与flex计算，0是不参与
    flex-shrink: 0;
  }
}
</style>
