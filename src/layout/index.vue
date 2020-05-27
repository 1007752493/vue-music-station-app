<template>
  <div id='index'>
    <Header />
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from './MainTabBar'
import Header from './header'
export default {
  name: 'index',
  components: {
    MainTabBar,
    Header
  }
}
</script>

<style scoped>
</style>