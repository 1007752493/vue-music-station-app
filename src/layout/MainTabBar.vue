<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <div slot="item-text">推荐</div>
    </tab-bar-item>
    <tab-bar-item path="category">
      <div slot="item-text">排行</div>
    </tab-bar-item>
    <tab-bar-item path="cart">
      <div slot="item-text">歌手</div>
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
