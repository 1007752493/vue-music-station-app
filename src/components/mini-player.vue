// 底部播放栏组件
<template>
  <div class="mini-player"
       id="mini-player">
    <!-- 歌曲内容 -->
    <div class="song">
      <template v-if="hasCurrentSong">
        <div @click="togglePlayerShow"
             class="img-wrap">
          <div class="mask"></div>
          <img v-lazy="$utils.genImgUrl(currentSong.img, 80)"
               class="blur" />
          <div class="player-control">
            <Icon :size="24"
                  :type="playControlIcon"
                  color="white" />
          </div>
        </div>
        <div class="content">
          <div class="top">
            <p class="name">{{ currentSong.name }}</p>
            <p class="split">-</p>
            <p class="artists">{{ currentSong.artistsText }}</p>
          </div>
          <div class="time">
            <span class="played-time">{{
              $utils.formatTime(currentTime)
            }}</span>
            <span class="split">/</span>
            <span class="total-time">{{
              $utils.formatTime(currentSong.duration / 1000)
            }}</span>
          </div>
        </div>
      </template>
    </div>
    <!-- 控制台 -->
    <div class="control">

      <el-popover :value="isPlayErrorPromptShow"
                  placement="top"
                  trigger="manual"
                  width="160">
        <p>请点击开始播放。</p>
        <div @click="togglePlaying"
             class="play-icon"
             slot="reference">
          <Icon :size="24"
                :type="playIcon" />
        </div>
      </el-popover>

    </div>

    <div class="mode">

      <!-- 播放列表 -->

      <!-- 音量 -->
      <div class="volume-item">
        <Volume :volume="volume"
                @volumeChange="onVolumeChange" />
      </div>
    </div>
    <div class="progress-bar-wrap">
      <ProgressBar :disabled="!hasCurrentSong"
                   :percent="playedPercent"
                   @percentChange="onProgressChange" />
    </div>
    <audio :src="currentSong.url"
           @canplay="ready"
           @ended="end"
           @timeupdate="updateTime"
           ref="audio"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} from "@/store/helper/music"
import Storage from "good-storage"
import Share from "@/components/share"
import { VOLUME_KEY, playModeMap, isDef } from "@/utils"

const DEFAULT_VOLUME = 0.75
export default {
  data () {
    return {
      isPlayErrorPromptShow: false,
      songReady: false,
      volume: Storage.get(VOLUME_KEY, DEFAULT_VOLUME)
    }
  },
  mounted () {
    this.audio.volume = this.volume
  },
  methods: {
    togglePlaying () {
      if (!this.currentSong.id) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    ready () {
      this.songReady = true
    },
    async play () {
      if (this.songReady) {
        try {
          await this.audio.play()
          if (this.isPlayErrorPromptShow) {
            this.isPlayErrorPromptShow = false
          }
        } catch (error) {
          // 提示用户手动播放
          this.isPlayErrorPromptShow = true
          this.setPlayingState(false)
        }
      }
    },
    pause () {
      this.audio.pause()
    },
    updateTime (e) {
      const time = e.target.currentTime
      this.setCurrentTime(time)
    },
    prev () {
      if (this.songReady) {
        this.startSong(this.prevSong)
      }
    },
    next () {
      if (this.songReady) {
        this.startSong(this.nextSong)
      }
    },
    end () {
      this.next()
    },
    onProgressChange (percent) {
      this.audio.currentTime = this.currentSong.durationSecond * percent
      this.setPlayingState(true)
    },
    onVolumeChange (percent) {
      this.audio.volume = percent
      Storage.set(VOLUME_KEY, percent)
    },
    onChangePlayMode () {
      const modeKeys = Object.keys(playModeMap)
      const currentModeIndex = modeKeys.findIndex(
        key => playModeMap[key].code === this.playMode
      )
      const nextIndex = (currentModeIndex + 1) % modeKeys.length
      const nextModeKey = modeKeys[nextIndex]
      const nextMode = playModeMap[nextModeKey]
      this.setPlayMode(nextMode.code)
    },
    togglePlaylistShow () {
      this.setPlaylistShow(!this.isPlaylistShow)
    },
    togglePlayerShow () {
      this.setPlayerShow(!this.isPlayerShow)
    },
    ...mapMutations([
      "setCurrentTime",
      "setPlayingState",
      "setPlayMode",
      "setPlaylistShow",
      "setPlayerShow"
    ]),
    ...mapActions(["startSong"])
  },
  watch: {
    currentSong (newSong, oldSong) {
      // 清空了歌曲
      if (!newSong.id) {
        this.audio.pause()
        this.audio.currentTime = 0
        return
      }
      // 单曲循环
      if (oldSong && newSong.id === oldSong.id) {
        this.setCurrentTime(0)
        this.audio.currentTime = 0
        this.play()
        return
      }
      this.songReady = false
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.play()
      }, 1000)
    },
    playing (newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause()
      })
    }
  },
  computed: {
    hasCurrentSong () {
      return isDef(this.currentSong.id)
    },
    playIcon () {
      return this.playing ? "pause" : "play"
    },
    currentMode () {
      return playModeMap[this.playMode]
    },
    modeIcon () {
      return this.currentMode.icon
    },
    playModeText () {
      return this.currentMode.name
    },
    audio () {
      return this.$refs.audio
    },
    // 播放的进度百分比
    playedPercent () {
      const { durationSecond } = this.currentSong
      return Math.min(this.currentTime / durationSecond, 1) || 0
    },
    playControlIcon () {
      return this.isPlayerShow ? "shrink" : "open"
    },
    shareUrl () {
      return `${window.location.origin}?shareMusicId=${this.currentSong.id}`
    },
    ...mapState([
      "currentSong",
      "currentTime",
      "playing",
      "playMode",
      "isPlaylistShow",
      "isPlaylistPromptShow",
      "isPlayerShow"
    ]),
    ...mapGetters(["prevSong", "nextSong"])
  },
  components: { Share }
}
</script>

<style lang="scss" scoped>
.mini-player {
  z-index: 100000;
  position: relative;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  height: $mini-player-height;
  padding: 8px 0px 8px 8px;

  background: #fff;

  .song {
    display: flex;
    flex: 4;
    overflow: hidden;

    .img-wrap {
      position: relative;
      margin-right: 8px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      @include img-wrap(40px);

      img {
        &.blur {
          filter: blur(2px);
        }
      }

      .player-control {
        @include abs-center;
      }

      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.2);
      }
    }

    .content {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .top {
        display: flex;
        align-items: flex-end;
        white-space: nowrap;

        .name {
          color: var(--font-color-white);
          @include text-ellipsis;
        }

        .split {
          font-size: $font-size-xs;
          margin: 0 4px;
        }

        .artists {
          font-size: $font-size-xs;
          @include text-ellipsis;
        }
      }

      .time {
        font-size: $font-size-xs;
        color: var(--font-color-grey);

        .split {
          margin: 0 4px;
        }
      }
    }
  }

  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 56.5%;
    transform: translateX(-50%);
    width: 100px;
    @include flex-center();

    .play-icon {
      @include flex-center();
      position: relative;
      width: 40px;
      height: 40px;
      margin: 0 16px;
      border-radius: 50%;
      background: $theme-color;
      cursor: pointer;

      i {
        color: #fff;
      }
      .icon-play {
        transform: translateX(1px);
      }
    }

    .icon {
      color: $theme-color;
    }
  }

  .mode {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;

    .mode-item {
      display: block;
    }

    .volume-item {
      margin-right: -10px;
    }
  }

  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
  }
}

.icon {
  color: var(--font-color);
  cursor: pointer;
}
</style>
