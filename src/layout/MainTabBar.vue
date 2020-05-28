<template>
  <tab-bar>
    <tab-bar-item path="/discovery">
      <div slot="item-text">推荐</div>
    </tab-bar-item>
    <tab-bar-item path="/songs">
      <div slot="item-text">最新</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <div slot="item-text">MV</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '../components/tabbar/TabBar'
import TabBarItem from '../components/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  },
}
</script>

<style scoped></style>
