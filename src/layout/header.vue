<template>
  <div id='header'>
    <nav-bar class="navbar">
      <div slot="left"
           class="left">
        <div path="/discovery"
             @click="itemClick">
          <img src="../assets/image/sort.png" />
        </div>
      </div>
      <div slot="center"
           @click="backClick">
        <h2>music station</h2>
      </div>
      <div slot="right"
           class="right">
        <img src="../assets/image/search.png" />
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
export default {
  name: 'sss',
  components: {
    NavBar,
  },
  methods: {
    itemClick () {
      // this.$router.replace('/discovery').catch((err) => {
      //   err
      // })
    },
    backClick () {
      this.$router.go(-1)
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #d33a31;
}

.navbar h2 {
  color: #fff;
}

.left img {
  width: 15px;
  height: 15px;
  /* 去掉图片下面像素 */
  vertical-align: middle;
  margin-bottom: 3px;
}

.right img {
  width: 20px;
  height: 20px;
  /* 去掉图片下面像素 */
  vertical-align: middle;
  margin-bottom: 3px;
}
</style>
