<template>
  <v-app>
    <v-toolbar app style="width: 100vw;">
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        class="headline text-uppercase"
      >
        <span class="mr-2">首页</span>
      </v-btn>
      <v-spacer />
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">返回</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
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
</style>
