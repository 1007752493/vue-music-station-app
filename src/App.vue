<template>
  <div id="app">
    <Header />
    <main-tab-bar />
    <router-view />
  </div>
</template>

<script>
import MainTabBar from './layout/MainTabBar'
import Header from './layout/header'
import Menu from './layout/menu'
export default {
  name: 'App',
  components: {
    MainTabBar,
    Header,
    Menu
  },
}
</script>

<style lang='scss' scoped>
@import "./style/index.scss";
</style>
