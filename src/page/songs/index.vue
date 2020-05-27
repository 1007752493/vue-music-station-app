// 最新音乐页面
<template>
  <div class="songs">
    <div class="tabs">
      <Tabs :tabs="tabs"
            @tabChange="getSongs"
            align="right"
            type="small"
            v-model="activeTabIndex" />
    </div>
    <Scroll class="content">
      <SongTable :songs="songs"
                 header-row-class-name="header-row" />
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { getTopSongs } from "@/api"
import { createSong } from "@/utils"
import SongTable from "@/components/song-table"
import Scroll from '../../components/Scroll'

export default {
  async created () {
    this.tabs = [
      { title: "全部", type: 0 },
      { title: "华语", type: 7 },
      { title: "欧美", type: 96 },
      { title: "日本", type: 8 },
      { title: "韩国", type: 16 }
    ]
    this.getSongs()
  },
  data () {
    return {
      activeTabIndex: 0,
      songs: []
    }
  },
  methods: {
    async getSongs () {
      const { data } = await getTopSongs(this.tabs[this.activeTabIndex].type)
      this.songs = data.map(song => {
        const {
          id,
          name,
          artists,
          duration,
          mvid,
          album: { picUrl, name: albumName }
        } = song
        return createSong({
          id,
          name,
          artists,
          duration,
          albumName,
          img: picUrl,
          mvId: mvid
        })
      })
    }
  },
  components: {
    SongTable,
    Scroll
  }
}
</script>

<style lang="scss" scoped>
.songs {
  margin-top: 44px;
  height: 100vh;
  .content {
    height: calc(100% - 180px);
    overflow: hidden;
  }
  .header-row {
    display: none;
  }
}
</style>
