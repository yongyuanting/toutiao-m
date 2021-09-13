<template>
  <div class="article_list">
    <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh"
                      :success-text="reFreshSuccessText" success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，你在点点试试？"
      >
        <article-item
          v-for="(article,index) in list"
          :key="index"
          :article="article"
        />
        <!--        <van-cell v-for="(article,index) in list" :key="index" :title="article.title"/>-->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesList } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'article-list',
  components: { ArticleItem },
  // props: ['channel'],
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 下一页的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的状态
      reFreshSuccessText: '' // 数据刷新提示
    }
  },
  methods: {
    // 初始化或滚动到底部会触发onload
    // onLoad () {
    //   console.log('onLoad')
    //   // 请求获取数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     // 将请求结果数据放到list数组中
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //
    //     // 加载状态结束
    //     this.loading = false
    //
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
    async onLoad () {
      // console.log(this.$attrs.channel.id)
      // 请求获取数据
      try {
        console.log(this.channel.id)
        const { data } = await getArticlesList({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 请求数据页码，请求第一页，当前时间戳
          // 请求之后数据的时间戳，会在当前请求结果中返回给你
          with_top: 0 // 是否包含置顶文章
        })
        // 强行报一个错,模拟随机失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsadiajsidas')
        // }
        // console.log(data)
        // 把请求结果数据放入list中
        const { results } = data.data
        // 数组展开操作符，他会把数组元素一个一个拿出来
        this.list.push(...results)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据，不在加载了
          this.finished = true
        }
      } catch (err) {
        this.error = true
        // 请求失败了，loading也需要关闭
        this.loading = false
      }
    },
    // 下拉刷新触发该函数
    async onRefresh () {
      // 请求获取数据
      try {
        // 将数据追加放入列表的开始
        const { data } = await getArticlesList({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 下拉刷新，每次获取最新数据
          with_top: 1
        })
        // 强行报一个错,模拟随机失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsadiajsidas')
        // }
        // 关闭下拉刷新的loading状态
        this.list.unshift(...data.data.results)
        this.isreFreshLoading = false
        this.reFreshSuccessText = `更新成功，告辞，一共刷新${data.data.results.length}条数据`
      } catch (err) {
        // console.log('请求数据错误', err)
        console.log('失败')
        this.loading = false
        this.reFreshSuccessText = '刷新失败，你再试试？'
      }
      // console.log('onrefresh')
    }
  }
}
</script>

<style scoped>
.article_list {
  height: 85vh;
  overflow-y: auto;
}
</style>
