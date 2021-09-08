<template>
  <div id="app">
    <!--    路由出口-->
    <router-view/>
    <h1>头条</h1>
    <div>
      <i class="iconfont icon-dianzan2"></i>
    </div>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
