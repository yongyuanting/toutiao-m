<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edit-btn" @click="isEdit=!isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <van-grid :gutter="10" class="grid-item my-grid">
      <van-grid-item
        v-for="(item,index) in myChannels"
        :key="index"
        @click="onMyChannelClick(item,index)">
        <!--
           v-bind:class语法
           一个对象，对象中的key表示要作用的CSS类名
                   对象中的value要计算出布尔值，为true则作用，false不作用类名
           -->
        <van-icon slot="icon" name="clear" v-show="isEdit && !flexChannel.includes(item.id)"></van-icon>
        <span
          slot="text"
          :class="{ active: index===active }"
          class="text">{{ item.name }}</span>
      </van-grid-item>
    </van-grid>

    <!--    频道推荐-->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="grid-item recommend-grid">
      <van-grid-item
        v-for="(channel,index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'channelEdit',
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      flexChannel: [0] // 固定频道，不允许删除
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    // recommendChannels () {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     const ret = this.myChannels.find(myChannel => {
    //       return myChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包含该频道项，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   return channels
    // }
    // 计算属性会观察内部依赖数据的变化，计算属性会重新求值运算
    ...mapState(['user']),
    recommendChannels () {
      // 数组的filter方法，遍历数组，把符合条件的元素，存储到新数组中并返回
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      // console.log(channel)
      this.myChannels.push(channel)
      // 数据持久化
      if (this.user) {
        try {
          // 已登录，数据上传到服务器
          await addUserChannels({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        // 未登录，数据存储在本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      // console.log(channel, index)
      // 编辑状态，删除频道
      // 参数1：要删除的元素索引，参数2：删除的个数，如果不指定，从参数1一直往后删除
      if (this.isEdit) {
        if (this.flexChannel.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          // 让激活频道的索引-1
          this.$emit('update-active', this.active - 1)
        }
        this.myChannels.splice(index, 1)
        // 数据持久化
        this.deleteChannel(channel.id)
      }
      // 非编辑状态，跳转频道
      if (!this.isEdit) {
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (id) {
      if (this.user) {
        try {
          // 已登录，更新到服务器
          await deleteUserChannels(id)
        } catch (err) {
          this.$toast('操作失败，请重试')
        }
      } else {
        // 未登录，将数据更新到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style lang="less">
.van-grid-item__content {
  background-color: #f4f5f6 !important;
  flex-direction: row;

  .van-grid-item__text {
    font-size: 28px;
    color: #222;
    margin-top: 0;
  }

  .van-icon-plus {
    font-size: 28px;
  }

}

.my-grid {
  .van-grid-item {
    .van-grid-item__content {
      .van-grid-item__icon-wrapper {
        position: unset;
      }

      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        z-index: 2;
        color: #cacaca;
      }

      .active {
        color: red;
      }
    }
  }

  .van-grid-item {
    .van-grid-item__text, .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
  }
}

.recommend-grid {
  .van-grid-item {
    .van-grid-item__content {
      flex-direction: row;
      white-space: nowrap;

      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }

      .van-grid-item__icon {
        margin-right: 6px;
      }

      .van-grid-item__text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
    }
  }
}

</style>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
}

.title-text {
  font-size: 32px;
  color: #333333;
}

.edit-btn {
  width: 104px;
  height: 48px;
  font-size: 26px;
  color: #f85959;
  border: 1px solid #f85959;
}

.van-grid-item {
  width: 160px;
  height: 86px;
}
</style>
