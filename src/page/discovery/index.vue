<template>
  <div class="discovery">
    <div class="discovery-content content">
      <scroll class="content">
        <Banner />
        <NewPlaylists />
        <NewSongs />
        <NewMvs />
      </scroll>
    </div>
  </div>
</template>

<script>
import Banner from './banner'
import NewPlaylists from "./new-playlists"
import Scroll from '../../components/Scroll'
import NewSongs from "./new-songs"
import NewMvs from './new-mvs'
export default {
  name: 'index',
  components: { Scroll, Banner, NewPlaylists, NewSongs, NewMvs },
}
</script>

<style lang="scss" scoped>
.discovery {
  margin-top: 31px;
  padding: 9px 12px;
  height: 100vh;
}

.content {
  height: calc(100% - 63px);
  overflow: hidden;
}
</style>
