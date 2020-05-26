<template>
  <div id="app">
    <Header />
    <main-tab-bar />
    <router-view />
    <MiniPlayer />
    <Playlist />
  </div>
</template>

<script>
import MainTabBar from './layout/MainTabBar'
import Header from './layout/header'
import MiniPlayer from "@/components/mini-player"
import Playlist from "@/components/playlist"
export default {
  name: 'App',
  metaInfo () {
    return {
      title: "music station~"
    }
  },
  components: {
    MainTabBar,
    Header,
    MiniPlayer,
    Playlist
  },
}
</script>

<style lang='scss' scoped>
@import "./style/index.scss";
</style>
