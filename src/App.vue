<template>
  <div id="app">
    <Header></Header>
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import MainTabBar from './layout/MainTabBar'
import Header from './layout/header'
export default {
  name: 'App',
  components: {
    MainTabBar,
    Header,
  },
}
</script>

<style>
@import './style/index.scss';
</style>
