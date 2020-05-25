<template>
  <!-- ref一般绑定给子组件 -->
  <div class="wrapper"
       ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 创建BScroll
    this.scroll = new BSscroll(this.$refs.wrapper, {
      click: true,
      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType
    })
    //监听滚动的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }
    //监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    }
    this.scroll && this.scroll.refresh() //刷新当前页面

    this.scroll && this.scroll.scrollTo(0, 0)
  },
  methods: {
    finishPullUp () { this.scroll.finishPullUp() }
  }
}
</script>

<style scoped>
</style>