<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item,index) in suggestions"
      :key="index">
      <div v-html="item" slot="title" :v-html="highlight(text)"></div>
    </van-cell>
    <!--    @click="onClickOption(item)" 子传父修改searchText的值watch无法监听？-->
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// 按需加载，快
import { debounce } from 'lodash'

export default {
  name: 'searchSuggestion',
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监听searchText，当它变化就进行一次查询
    // handler函数名称固定
    // 第一次没有变化：第一次组件没有被渲染出来，没有触发到
    // 上来就触发一次
    // 使用setTimeout延时？调用不要那么快
    // 这里使用lodash的debounce
    searchText: {
      handler: debounce(function (value) {
        // console.log(value)
        // 发请求，拿数据，展示
        this.loadSearchSuggestions(value)
      }, 300),
      // handler: function (value) {
      //   console.log(value)
      // },
      // debounce函数 参数1，一个函数，参数2，延迟时间，返回值，防抖之后的函数
      // handler: debounce(function (value) {
      //   console.log(value)
      // }, 1000),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        // console.log(data)
        this.suggestions = data.data.options
        console.log(this.suggestions)
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    // 高亮函数
    highlight (text) {
      return 123
    }
  }
  // onClickOption (text) {
  //   this.$emit('textChange', text)
  // }
}
</script>

<style scoped>

</style>
