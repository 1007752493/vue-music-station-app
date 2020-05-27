<template>
  <div id="app">
    <Index />
    <MiniPlayer />
    <Playlist />
    <router-view />
  </div>
</template>

<script>
import Index from './layout/index'
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
    Index,
    MiniPlayer,
    Playlist
  },
}
</script>

<style lang='scss' scoped>
@import "./style/index.scss";
</style>
