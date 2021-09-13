<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap">
        <div v-if="article.cover.type===3" class="cover-item">
          <div class="cover-item" v-for="(img,index) in article.cover.images" :key="index">
            <van-image
              :src="img"
              fit="cover"
              class="cover-item-image"
            />
          </div>
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type===1"
      width="100"
      height="100"
      :src="article.cover.images[0]"
      slot="default"
      class="right-cover"
      fit="cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'article-item',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.article-item {
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
}
</style>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    margin-right: 25px;
    font-size: 22px;
    color: #b4b4b4;
  }

  .cover-item {
    display: flex;
    padding: 30px 0;

    .cover-item {
      height: 146px;
      flex: 1;

      &:not(:last-child) {
        padding-right: 4px;
      }

      .cover-item-image {
        width: 100%;
        height: 146px;
        //margin: 0 2px;
      }
    }
  }
}
</style>
