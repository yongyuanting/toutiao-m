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
        @focus="isResultShow=false"
      />
    </form>
    <!--    搜索结果-->
    <search-result v-if="isResultShow"></search-result>
    <!--    搜索结果-->
    <!--    联想建议-->
    <!--    @onClickOption="onClickOption" 子传父出问题-->
    <search-suggestion v-else-if="searchText" :search-text="searchText"></search-suggestion>
    <!--    联想建议-->
    <!--    搜索历史记录-->
    <search-history v-else></search-history>
    <!--    搜索历史记录-->
  </div>
</template>

<script>
// 一定要在components中注册组件
import SearchHistory from './components/searchHistory'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  name: 'SearchIndex',
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory
  },
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果的展示
    }
  },
  methods: {
    onSearch (val) {
      this.$toast(val)
      this.isResultShow = true
    },
    onCancel () {
      // this.$toast('取消')
      this.$router.back()
    }
    // onClickOption (text) {
    //   this.searchText = text
    // }
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
