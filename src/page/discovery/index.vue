<template>
  <div class="discovery">
    <div class="discovery-content content">
      <scroll class="content">
        <Banner />
        <NewPlaylists />
        <NewSongs />
      </scroll>
    </div>
  </div>
</template>

<script>
import Banner from './banner'
import NewPlaylists from "./new-playlists"
import Scroll from '../../components/Scroll'
import NewSongs from "./new-songs"
export default {
  name: 'index',
  components: { Scroll, Banner, NewPlaylists, NewSongs },
}
</script>

<style lang="scss" scoped>
.discovery {
  margin-top: 32px;
  padding: 9px 12px;
  height: 100vh;
}

.content {
  height: calc(100% - 32px);
  overflow: hidden;
}
</style>
