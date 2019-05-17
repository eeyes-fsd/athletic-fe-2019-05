<template>
  <v-app>
    <v-toolbar app style="width: 100vw;">
      <v-btn
        flat
        class="headline text-uppercase"
        @click="$router.push({ name: 'home' })"
      >
        <span class="mr-2">首页</span>
      </v-btn>
      <v-spacer />
      <v-btn
        flat
        @click="$router.go(-1)"
      >
        <span class="mr-2">返回</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer class="app-footer">
      <router-link :to="{ name: 'admin_login' }">
        管理端入口
      </router-link>
      <p>Copyright&copy;2002-2018 eeYes.net All Rights Reserved 版权所有 陕ICP备030061号</p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      //
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  overflow: hidden;
}
.app-footer {
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
