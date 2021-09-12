<template>
  <div class="layout-content">
    <!--    子路由出口-->
    <router-view></router-view>

    <!--    标签导航栏-->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item replace to="/">
        <template #icon>
          <div class="iconfont icon-shouye"></div>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa">
        <template #icon>
          <div class="iconfont icon-wenda"></div>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video">
        <template #icon>
          <div class="iconfont icon-shipin"></div>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine">
        <template #icon>
          <div class="iconfont icon-wode"></div>
        </template>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-content {
  .layout-tabbar {
    div.iconfont {
      font-size: 40px;
    }

    span.text {
      font-size: 20px;
    }
  }
}
</style>
