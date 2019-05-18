<template>
  <div class="admin-login">
    <v-container>
      <v-text-field
        value="admin"
        disabled
        label="用户名"
        required
      />
      <v-text-field
        v-model="password"
        label="密码"
        required
        type="password"
        @keypress.enter="login"
      />
      <v-btn color="info" @click="login">
        登录
      </v-btn>
      <p class="admin-warning">
        该页面请使用电脑打开
      </p>
    </v-container>
  </div>
</template>

<script>
import api from '@/api'
import swal from 'sweetalert'
import { mapMutations } from 'vuex'

export default {
  name: 'AdminLogin',
  data() {
    return {
      password: ''
    }
  },
  methods: {
    ...mapMutations({
      savePassword: 'savePassword'
    }),
    async login() {
      try {
        const data = await api.login(this.password)
        if (data.status) {
          this.savePassword(this.password)
          await swal('成功', '登录成功，点击确定跳转', 'success')
          this.$router.push({ name: 'admin' })
        } else {
          swal('错误', '密码不正确', 'error')
        }
      } catch (error) {
        this.$handleError(error)
      }
    }
  }
}
</script>
