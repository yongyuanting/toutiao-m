<template>
  <div class="search-content">
    <!--顶部搜索栏-->
    <!--Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。-->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(val)
    },
    onCancel () {
      // this.$toast('取消')
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
.search-content {
  .van-search__action {
    color: #fff;
  }
}
</style>

<style scoped>

</style>
