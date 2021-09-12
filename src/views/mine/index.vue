<template>
  <div class="mine-content">
    <!--    已登录头部-->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!--    已登录头部-->
    <!--    未登录头部-->
    <div class="header no-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!--    未登录头部-->

    <!--    导航-->
    <van-grid :column-num="2" class="grid-nav mb-9" clickable>
      <van-grid-item text="收藏" class="grid-item">
        <template #icon>
          <div class="iconfont icon-shoucang"></div>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史" class="grid-item">
        <template #icon>
          <div class="iconfont icon-lishi"></div>
        </template>
      </van-grid-item>
    </van-grid>
    <!--    导航-->

    <van-cell title="消息通知" is-link/>
    <van-cell class="mb-9" title="小智同学" is-link/>
    <van-cell class="logout-cell" title="退出登录" v-if="user" @click="onLogout" clickable></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'mine',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout () {
      // 退出提示
      // 在组件中需要使用this.$dialog来调用
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          // console.log('确认')
          // 做清除操作
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消')
        })
      // 确认退出，清楚登录状态，删除容器user和本地存储的token
    },
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        // console.log(res.data)
        this.userInfo = res.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mine-content {
  .header {
    height: 361px;
    // @指定src文件必须加~才能正常使用
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .no-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .avatar {
          width: 132px;
          height: 132px;
          border: 1px solid #ffffff;
        }

        .name {
          margin-left: 23px;
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-status {
      height: 130px;
      display: flex;

      .data-item {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      font-size: 28px;

      div.iconfont {
        font-size: 45px;
      }

      div.icon-shoucang {
        color: #eb5253;
      }

      div.icon-lishi {
        color: #ff9d1d;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #f32d4b;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>
