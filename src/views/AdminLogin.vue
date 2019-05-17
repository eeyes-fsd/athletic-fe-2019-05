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
      />
      <v-btn color="info" @click="login">
        登录
      </v-btn>
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
        console.log('ok', data)
      } catch (error) {
        console.log('error', error)
        swal('错误', '发生错误：' + error.message, 'error')
      }
    }
  }
}
</script>

<style>

</style>
