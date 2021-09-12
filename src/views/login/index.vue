<template>
  <div class="login-content">
    <!--    导航栏-->
    <van-nav-bar title="登录" class="page-nav-var">
      <template #left>
        <div class="iconfont icon-zuojiantou" @click="$router.push('/mine')"></div>
      </template>
    </van-nav-bar>
    <!--    导航栏-->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        name="mobile"
        placeholder="请填写手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11">
        <template slot="left-icon">
          <div class="iconfont icon-shouji"></div>
        </template>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code">
        <template slot="left-icon">
          <div class="iconfont icon-yanzhengma"></div>
        </template>
        <template #button>
          <van-count-down :time='1000*60' format="ss s" v-if="iscountShow===true" @finish="iscountShow=false"/>
          <!--       time是倒计时时间-->
          <van-button v-else size="small" type="default" round class="send-sms-btn" @click="onSendSms"
                      native-type="button">
            获取验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import axios from 'axios'

export default {
  name: 'index',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '请填写验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      iscountShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      // 给van-filed组件配置rules验证规则
      // 验证成功触发submit
      // 在组建中必须通过this.$toast来调用Toast组件
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        // 持续时间默认两秒
        duration: 0 // 如果为0则持续展示
      })
      // 提交表单请求登录
      try {
        const { data: res } = await login(user)
        console.log('登录成功', res)
        // 任何一个新的toast调用会关闭之前的toast
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        // 跳转回原来页面,back方式不严谨
        this.$router.back()
        // 严谨
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 根据请求响应结果，处理后续操作
    },
    async onSendSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginFormRef.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.iscountShow = true
      // 3.请求发送验证码
      try {
        // const { data: res } = await sendSms(this.user.mobile)
        const res = await sendSms(this.user.mobile)
        // const { data: res } = await axios.get('http://ttapi.research.itcast.cn/app/v1_0/sms/codes/15223325883')
        this.$toast('发送成功')
        console.log('发送成功', res)
      } catch (err) {
        this.iscountShow = false
        if (err.response.status === 429) {
          return this.$toast('发送太频繁，请稍后重试')
        } else {
          console.log('发送失败', err)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-content {

  .iconfont {
    font-size: 37px;
  }

  .send-sms-btn {
    background-color: #ededed !important;
    width: 170px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

  .page-nav-var {
    .icon-zuojiantou {
      color: #fff;
      font-size: 30px;
    }
  }
}

</style>
