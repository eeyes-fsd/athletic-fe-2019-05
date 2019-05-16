<template>
  <div id="app">
    <div class="pure-menu pure-menu-horizontal pure-menu-scrollable home-menu">
      <a href="/" class="pure-menu-link pure-menu-heading">首页</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a href="#" class="pure-menu-link">返回</a>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
