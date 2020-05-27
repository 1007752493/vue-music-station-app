<template>
  <div class="tab-bar-item"
       @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg">
    <div>首页</div> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeLength: {
      type: String,
      default: '14.5px',
    },
    activeColor: {
      type: String,
      default: '#fbeeed',
    },
    activeWeight: {
      type: String,
      default: 'bold',
    },
  },
  data () {
    return {
      isShow: true,
    }
  },
  computed: {
    isActive () {
      //indexOf方法：如果字符串没有此值 返回-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      // 如果是 如果 不是 {}
      return this.isActive
        ? {
          'font-size': this.activeLength,
          color: this.activeColor,
          'font-weight': this.activeWeight,
        }
        : {}
    },
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path).catch((err) => {
        err
      })
    },
  },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 40px;
  font-size: 15px;
  line-height: 30px;
  color: #fff;
}
</style>
